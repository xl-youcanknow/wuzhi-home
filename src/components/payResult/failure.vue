<template>
    <div class="result-container">
        <h6>TRANSACTION FAILED</h6>
        <div class="img"><img src="../../public/img/pay/errors.png" alt=""></div>
        <p>Please Try Again</p>
        <button>
            <router-link to="/order/configOrder">
            try Again
            </router-link>
        </button>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
*{
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
}
.result-container{
    width: 1190px;
    margin: 0 auto;
    padding: 30px 0;
    h6{
        font-size: 35px;
        color: #31317E;
        text-align: center;
        padding: 35px 0;
    }
    .img{
        width: 250px;
        margin: 20px auto;
        img{
            max-width: 100%;
        }
    }
    p{
        font-size: 25px;
        color: #31317E;
        padding: 25px 0;
        text-align: center;
    }
    button{
        background: #31317E;
        color: #ffffff;
        text-align: center;
        display: block;
        width: 250px;
        font-size: 18px;
        margin: 0 auto;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        a{
            color: inherit
        }
    }
}
@media only screen and (max-width: 1190px) {
    .result-container{
        width: 96%;
        h6{
            padding: 20px 0;
        }
        .img{
            width: 180px
        }
    }
}
</style>
