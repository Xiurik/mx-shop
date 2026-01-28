import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { getProductByIdAction } from '@/modules/products/actions';
import { Gender, Size } from '@/modules/products/interfaces/product.interface';
import router from '@/router';
import { useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import { defineComponent, watch, watchEffect } from 'vue';
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
      required: true,
    },
  },
  setup(props) {
    const allSizes: Size[] = [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL];
    const allGenders: Gender[] = [Gender.KID, Gender.WOMEN, Gender.MEN, Gender.UNISEX];

    const {
      data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['product', props.prodId],
      queryFn: () => getProductByIdAction(props.prodId),
      retry: false,
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

    const onSubmit = handleSubmit((formValues) => {
      console.log(formValues);
    });

    return {
      allGenders,
      allSizes,

      product,
      onSubmit,
      values,
      errors,

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
