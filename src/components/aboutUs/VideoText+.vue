<template>
    <div class="videoText">
        <h6>WHO WE ARE</h6>
        <div class="video-box">
            <div class="video-top"><img src="../../public/img/video/video1.png" alt=""></div>
            <div class="video-top"><img src="../../public/img/video/video2.png" alt=""></div>
        </div>
        <div class="main">
        OKportal is an integrated WiFi management and digital advertising platform. Established in 2017, we are an innovative technology company providing fast and simple solutions to small and medium businesses across Southeast Asia and Africa.
        <br>
        <br>
        We pride ourselves on our comprehensive knowledge and expertise in multiple industries and our ability to ensure that customers receive cost-friendly and effective solutions that meet their business requirements.
        </div>
    </div>
</template>

<style lang="less" scoped>
.videoText{
    margin: 0 auto;
    max-width: 1200px;
    h6{
        font-size: 32px;
        color: #498FCC;
        text-align: center;
        padding: 30px 0;
        padding-top: 50px;
        margin: 0;
    }
    .video-box{
        .video-top{
            width: 100%;
            img{
                width: 100%;
            }
        }
        video{
            display: block;
            width: 98%;
            margin: 0 auto;
        }
    }
    .main{
        margin: 80px 0;
        color: #323232;
        font-size: 20px;
        text-align: center;
        line-height: 25px;
    }
}
</style>
