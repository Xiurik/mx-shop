import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { createProductAction, getProductByIdAction, updateProductAction } from '@/modules/products/actions';
import { Gender, Size, type ProductDto } from '@/modules/products/interfaces/product.interface';
import router from '@/router';
import { useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import { defineComponent, watch, watchEffect } from 'vue';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';

const ProductSchema = yup.object({
  title: yup.string().required().min(2),
  slug: yup.string().required(),
  description: yup.string().required().min(10),
  price: yup.number().required().min(1),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf([Gender.KID, Gender.WOMEN, Gender.MEN, Gender.UNISEX]),
});

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
  },
  props: {
    prodId: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const Toast = useToast();
    const allSizes: Size[] = [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL];
    const allGenders: Gender[] = [Gender.KID, Gender.WOMEN, Gender.MEN, Gender.UNISEX];

    const {
      data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['product', props.prodId],
      queryFn: () => getProductByIdAction(props.prodId!),
      retry: false,
      enabled: !!props.prodId,
    });

    const { values, defineField, errors, handleSubmit, resetForm } = useForm({
      validationSchema: ProductSchema,
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: images } = useFieldArray<string>('images');
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

    const toggleSize = (size: Size) => {
      const index = returnSizeIndex(size);
      if (index !== -1) {
        removeSize(index);
      } else {
        pushSize(size);
      }
    };

    const returnSizeIndex = (size: Size) => sizes.value.findIndex((field) => field.value === size);

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace({ name: 'admin.products' });
      }
    });

    watch(
      product,
      () => {
        if (!product.value) return;

        resetForm({
          values: product.value,
        });
      },
      { immediate: true, deep: true },
    );

    watch(
      () => props.prodId,
      () => {
        if (!props.prodId) {
          product.value = undefined;
          resetForm({
            values: {
              title: '',
              slug: '',
              description: '',
              price: 0,
              stock: 0,
              gender: '',
              images: [],
              sizes: [],
              tags: [],
              id: '',
              user: {
                id: '',
                fullName: '',
                roles: [],
                email: '',
                isActive: false,
              },
            },
          });
        }
      },
      { immediate: true },
    );

    const onSubmit = handleSubmit(async (formValues) => {
      try {
        const data: ProductDto = {
          description: formValues.description,
          gender: formValues.gender,
          images: images.value.map((image) => image.value),
          price: Number(formValues.price),
          sizes: sizes.value.map((size) => size.value),
          slug: formValues.slug,
          stock: Number(formValues.stock),
          tags: product.value?.tags || [],
          title: formValues.title,
        };

        if (!props.prodId) {
          console.log('createProductAction');
          const product = await createProductAction(data);
          Toast.success(`Product created successfully!`);
          console.log('product => ', product);
          router.push({ name: 'admin.products' });
        } else {
          console.log('updateProductAction');
          const updatedProduct = await updateProductAction(data, props.prodId);
          Toast.success(`Product updated successfully!`);
          console.log('updatedProduct => ', updatedProduct);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return {
      allGenders,
      allSizes,

      product,
      onSubmit,
      values,
      errors,
      isLoading,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      images,
      sizes,
      toggleSize,
      returnSizeIndex,
    };
  },
});
