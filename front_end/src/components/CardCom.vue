<template>
    <div class="card-box">
        <div class="card-top">
            <img :src="bookList.url" alt="">
        </div>
        <div class="card-bottom">
            <span>{{ bookList.text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardCom",
    props: ['bookList']
}
</script>

<style scoped>
.card-box {
    display: flex;
    flex-direction: column;
    width: 220px;
    /* margin: 5px; */
}

.card-top {
    border-radius: 10%;
}

.card-bottom {
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #0B539B;
}

.card-top img {
    height: auto;
    object-fit: cover;
}
</style>