<template>
  <section>
    <div v-if="product" class="product">
      <ul class="photos" v-if="product.photos">
        <li v-for="(foto, index) in product.photos" :key="index">
          <img :src="foto.src" :alt="foto.title" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price | priceNumber }}</p>
        <p class="description">{{ product.description }}</p>
        <transition mode="out-in" v-if="product.sold === 'false' && this.$store.state.user.id !== +product.user_id">
          <button class="btn" v-if="!finish" @click="finish = true">Comprar</button>
          <FinishPurchase v-else :product="product"/>
        </transition>
				<router-link to="/user" tag="button" class="btn" v-else-if="this.$store.state.user.id === +product.user_id">Meus produtos</router-link>
        <button class="btn btn-disabled" v-else disabled>Produto Vendido</button>
      </div>
    </div>
    <PageLoading v-else />
  </section>
</template>

<script>
import { api } from "@/services";
import PageLoading from "@/components/PageLoading.vue";
import FinishPurchase from "@/components/FinishPurchase.vue";

export default {
  name: "Product",
  props: ["id"],
  data() {
    return {
      product: null,
			finish: false,

    };
  },
  methods: {
    getProduct() {
      api.get(`/product/${this.id}`).then((response) => {
        this.product = response.data;
				document.title = this.product.name
      });
    },
  },
  created() {
    this.getProduct();
  },
  components: {
    PageLoading,
    FinishPurchase,
  },
};
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: rem(30);
  max-width: rem(900);
  padding: rem(60) rem(20);
  margin: 0 auto;

	.photos {
		grid-row: 1 / 3;

		img {
			margin-bottom: rem(20);
			box-shadow: $shadow_alt;
			border-radius: rem(4);
		}
	}

  .info {
		position: sticky;
		top: rem(30);
    .price {
      color: $orange;
      font-weight: bold;
      font-size: rem(24);
      margin-bottom: rem(40);
    }
    .description {
      font-size: rem(20);
    }
    .btn {
      margin-top: rem(60);
      width: rem(200);
    }
  }

	@media screen and (max-width: rem(767)) {
		grid-template-columns: 1fr;

		.photos {
			grid-row: 2;
		}

		.info {
			position: initial;
		}
	}
}
</style>
