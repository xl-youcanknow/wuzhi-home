<template>
<div class="unequalsizes-out">
  <div class="unequalsizes clearfix">
      <div class="left">
          <img src="http://iph.href.lu/580x340?text=okportal&bg=CC3399" alt="">
          <div class="more">
              tips
          </div>
      </div>
      <div class="right">
          <div class="top">
               <img src="http://iph.href.lu/570x182?text=okportal&bg=339999" alt="">
                <div class="more">
                    tips
                </div>
          </div>
          <div class="bottom">
              <div class="small-l">
                  <img src="http://iph.href.lu/252x148?text=okportal&bg=FFFF33" alt="">
                   <div class="more">
                        tips
                    </div>
              </div>
              <div class="small-r">
                  <img src="http://iph.href.lu/252x148?text=okportal&bg=336666" alt="">
                   <div class="more">
                        tips
                    </div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'UnequalSizes',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.transition{
    transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
    -webkit-transition: all .5s;
}
.moreStyle{
    position: absolute;
    z-index: 9;
    bottom: -32px;
    left: 0;
    width: 100%;
    height: 32px;
    line-height: 32px;
    background-color: rgba(0, 0, 0, .4);
    color: #fff;
    font-size: 14px;
    .transition();
}
.unequalsizes-out{
    width: 100%;
    border-top: 3px solid #30338d;
    margin-top: 5px;
}
    .unequalsizes{
        width: 1160px;
        margin: 20px auto 20px;
        .left{
            width:565px;
            height: 340px;
            float: left;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            img{
                width: 100%;
            }
            &>.more{
                .moreStyle();
            }
            &:hover .more{
                bottom: 0px;
            }
        }
        .right{
            float: left;
            width:calc(~"50% - 30px");
            margin-left: 30px;
            .top{
                float: left;
                width: 100%;
                height: 166px;
                position: relative;
                 overflow: hidden;
                img{
                    width: 100%;
                }
                &>.more{
                    .moreStyle();
                }
                &:hover .more{
                bottom: 0px;
            }
            }
            .bottom{
                float: left;
                margin-top: 20px;
                width: 100%;
                .small-l,.small-r{
                    float: left;
                    width: calc(~"50% - 8px");
                    margin-right: 16px;
                    position: relative;
                    overflow: hidden;
                    height: 148px;
                     &>.more{
                        .moreStyle();
                    }
                    &:hover .more{
                bottom: 0px;
            }
                    img{
                        width: 100%;
                    }
                }
                .small-r{
                    margin-right: 0px;
                }
            }
        }
    }
    @media (min-width:1024px) and (max-width:1400px) { 

}

@media (min-width:768px) and (max-width:1024px) {   

}

@media only screen and (max-width: 768px){ 
  .unequalsizes{
    width: 96%;
    margin: 0 2%;
    padding-top: 10px;
    .left{
        width: 100%;
        height: auto;
    }
    .right{
        width: 100%;
        margin-left: 0px;
        .small-l,.small-r{
            height: auto;
        }
    }
  }
}
</style>
