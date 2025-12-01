<template>
  <div class="form">
    <el-row :gutter="40">
      <div class="silo"></div>
    </el-row>
    <div class="maplist">
      <div class="info">
        <h1 class="title">Our Office</h1>
        <ul>
          <li @click="Upnewmap(0)">
            <div class="country">
              <img src="../../public/img/contact_us/con_country1.png" alt>
            </div>
            <div class="address">
              <h6>China Office</h6>
              <div>
                <img src="../../public/img/contact_us/contactus2.png" alt>
              </div>
              <div>
                <p>Anxu Business Park</p>
                <p>Xiang Yin Road 35-1, Longgang District</p>
                <p>Shenzhen, China 518100</p>
              </div>
            </div>
          </li>
          <li @click="Upnewmap(1)">
            <div class="country">
              <img src="../../public/img/contact_us/con_country2.png" alt>
            </div>
            <div class="address">
              <h6>Hong Kong Office</h6>
              <div>
                <img src="../../public/img/contact_us/contactus2.png" alt>
              </div>
              <div>
                <p>Yau Tong Industrial City</p>
                <p>Ko Fai Road 17, Yau Tong District</p>
                <p>Kowloon, Hong Kong 999077</p>
              </div>
            </div>
          </li>
          <li @click="Upnewmap(2)">
            <div class="country">
              <img src="../../public/img/contact_us/con_country3.png" alt>
            </div>
            <div class="address">
              <h6>Philippines Office</h6>
              <div>
                <img src="../../public/img/contact_us/contactus2.png" alt>
              </div>
              <div>
                <p>36 S. Veloso st Brgy Salapan San Juan city</p>
                <p>Manila, Philippines</p>
              </div>
            </div>
          </li>
          <li @click="Upnewmap(3)">
            <div class="country">
              <img src="../../public/img/contact_us/con_country4.png" alt>
            </div>
            <div class="address">
              <h6>Ghana Office</h6>
              <div>
                <img src="../../public/img/contact_us/contactus2.png" alt>
              </div>
              <div>
                <p>HNo 13 Kaiser Valley, South Dome</p>
                <p>Accra, Ghana</p>
              </div>
            </div>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <gmap-map ref="mapRef" :center="center" :zoom="12" style="width:100%;  height: 400px;">
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
        ></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>
<script>
import store from "@/store/index.js";
import langScript from "@/lang/index.js";

export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 22.709171, lng: 114.25591 },
      // center: { lat: 114.25591, lng: 22.709171},
      markers: [],
      places: "",
      currentPlace: null
    };
  },

  mounted() {
    // this.geolocate();
    // this.getLang();
    this.initMarker();
    this.getLang();
  },

  methods: {
    initMarker() {
      this.markers.push({
        position: {
          lat: 22.709171,
          lng: 114.25591
        }
      });
    },
    Upnewmap(index) {
      if (index == 0) {
        this.$refs.mapRef.$mapPromise.then(map => {
          map.panTo({ lat: 22.709171, lng: 114.25591 });
        });
        this.markers.push({
          position: {
            lat: 22.709171,
            lng: 114.25591
          }
        });
      } else if (index == 1) {
        this.$refs.mapRef.$mapPromise.then(map => {
          map.panTo({ lat: 22.2921, lng: 114.239928 });
        });
        this.markers.push({
          position: {
            lat: 22.2921,
            lng: 114.239928
          }
        });
      } else if (index == 2) {
        this.$refs.mapRef.$mapPromise.then(map => {
          map.panTo({ lat: 14.6101827, lng: 121.0238306 });
        });
        this.markers.push({
          position: {
            lat: 14.6101827,
            lng: 121.0238306
          }
        });
      } else {
        this.$refs.mapRef.$mapPromise.then(map => {
          map.panTo({ lat: 5.655549, lng: -0.233724 });
        });
        this.markers.push({
          position: {
            lat: 5.655549,
            lng: -0.233724
          }
        });
      }
    },
    getLang() {
      this.text = langScript.partners;
    }
  },
  computed: {
    type() {
      return store.state.currency.lang;
    }
  },
  watch: {
    type() {
      this.getLang();
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 50px 20px;
  background: #eaf7fe;
  .maplist {
    max-width: 1200px;
    margin: 0 auto;
    .map {
      max-width: 1200px;
      height: 400px;
      border: 1px #d3d3d3 solid;
    }
    #container {
      max-width: 1200px;
      height: 400px;
    }
    .silo {
      background: #2f328c;
      height: 30px;
      width: 100%;
      margin-bottom: 20px;
    }
    .info {
      .title {
        color: #498fcc;
        margin: 30px 0;
        font-size: 34px;
        font-weight: bold;
      }
      ul {
        li {
          width: 50%;
          float: left;
          margin-bottom: 42px;
          cursor: pointer;
          display: flex;
          display: -webkit-flex;
          align-items: flex-start;
          .country {
            margin-right: 15px;
          }
          .address {
            display: flex;
            display: -webkit-flex;
            flex-wrap: wrap;
            h6 {
              color: #2b2b82;
              font-size: 24px;
              width: 100%;
              margin-bottom: 10px;
            }
            div:nth-of-type(2) {
              margin-left: 10px;
              p {
                font-size: 18px;
                line-height: 20px;
              }
            }
          }
        }
        li:hover {
          background: #eeeeee;
        }
      }
    }
  }
}
@media only screen and (max-width: 1366px) {
  .form{
    .maplist{
      width: 83%
    }
  }
}
@media only screen and (max-width: 1200px) {
  .form {
    .title {
      color: #2b2b82;
      margin: 20px 0 !important;
      font-size: 20px !important;
      font-weight: bold;
    }
    .maplist{
      .info{
        ul{
          li{
            width: 100%
          }
        }
      }
    }
    ul {
      li {
        margin-bottom: 32px;
        .name {
          color: #9f8283;
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 16px !important;
        }
        .address {
          color: #666;
          font-size: 16px !important;
          line-height: 15px;
        }
      }
    }
    #container {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style >
.amap-copyright {
  z-index: 0 !important;
}
.amap-logo {
  z-index: 0 !important;
}
</style>
