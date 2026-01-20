import { getProductByIdAction } from '@/modules/products/actions';
import { Gender, Size } from '@/modules/products/interfaces/product.interface';
import { useQuery } from '@tanstack/vue-query';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const allSizes: Size[] = [Size.S, Size.M, Size.L, Size.XL, Size.XXL];
    const allGenders: Gender[] = [Gender.KID, Gender.WOMEN, Gender.MEN];
    const route = useRoute();
    const { id } = route.params;

    const { data: product } = useQuery({
      queryKey: ['product', id],
      queryFn: () => getProductByIdAction(id as string),
    });

    const onSubmit = () => {
      console.log(product.value);
    };

    return {
      allGenders,
      allSizes,
      onSubmit,
      product,
    };
  },
});
