<template>
  <div class="product" v-if="product">
    <router-link class="img-product" :to="{ name: 'product', params: { id: product.id } }">
      <img
        v-if="product.photos"
        :src="product.photos[0].src"
        :alt="product.photos[0].title"
      />
    </router-link>
    <div class="info">
      <p class="price">{{ product.price | priceNumber }}</p>
      <h2 class="title">{{ product.name }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"],
};
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: minmax(rem(100), rem(200)) 1fr;
  gap: rem(20);
  margin-bottom: rem(40);
  position: relative;
	background: $white;
	box-shadow: $shadow;
	.img-product {
		border-radius: rem(4);
		overflow: hidden;
		max-height: rem(100);
	}
	
	.info {
		align-self: end;
		margin-bottom: rem(8);
	}

	@media screen and (max-width: rem(767)) {
		grid-template-columns: 1fr;
		gap: rem(10);
	}
}
</style>
