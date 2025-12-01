<template>
  <div class="contactFrom-out">
    <div class="contactFrom">
      <div class="form-detail">
        <h1 class="title" style="font-family:'MyriadSetPro-Thin';">Leave Us a Message</h1>
        <ul>
          <li>
            <div class="label">Name *</div>
            <div class="input">
              <input type="text" placeholder="Name" v-model.trim="name">
            </div>
          </li>
          <li>
            <div class="label">Email *</div>
            <div class="input">
              <input type="text" placeholder="Email" v-model.trim="email">
            </div>
          </li>
          <li>
            <div class="label">Phone *</div>
            <div class="input">
              <input type="text" placeholder="Phone" v-model.trim="phone">
            </div>
          </li>
          <li>
            <div class="label">Comments *</div>
            <div class="input" style="height:100px;">
              <textarea name id v-model.trim="comments"></textarea>
            </div>
          </li>
          <li></li>
          <li class="clearfix">
            <template>
              <Verify
                ref="verify"
                @success="verifyState = true"
                @error="alert('error')"
                explain="Drag the slider to the right"
                :type="3"
                style="width:50%;float:left"
              ></Verify>
            </template>
            <el-button
              type="text"
              class="submit"
              :loading="loading"
              @click="submit()"
              style="float:right;background-color:#3C3B88"
            >Send</el-button>
          </li>
        </ul>
      </div>
      <div class="form-img">
        <img src="../../public/img/video/contactus1.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { contactus } from "@/api/index";
import Verify from "@/components/Verify";

export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      comments: "",
      catp: "",
      disabled: true,
      loading: false,
      verifyState: true
    };
  },
  components: {
    Verify
  },
  created() {
    console.log(this.$refs.verify);
  },
  methods: {
    submit() {
      if (
        this.name.length > 0 &&
        this.email.length > 0 &&
        this.checkEmail(this.email) &&
        this.phone.length > 0 &&
        this.comments.length > 0
      ) {
        if (this.verifyState) {
          this.loading = true;
          contactus({
            name: this.name,
            email: this.email,
            phone: this.phone,
            comments: this.comments
          }).then(res => {
            this.$refs.verify.refresh();
            this.loading = false;
            if (res.code == 200) {
              this.$message({
                message: "Send success",
                type: "success"
              });
              this.name = "";
              this.email = "";
              this.phone = "";
              this.comments = "";
            }
          });
        } else {
          this.$message({
            message: "Please slide authentication",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "Enter all information and correct email",
          type: "error"
        });
      }
    },
    showcapt() {
      this.catp.show();
    },
    checkEmail(str) {
      var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../public/css/currency.less";
.contactFrom-out {
  padding: 50px 0;
  .title {
    margin-top: 50px;
    font-size: 34px;
    width: 100%;
    text-align: left;
    color: #498fcc;
    margin-bottom: 50px;
    font-weight: bold;
  }
  .contactFrom {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    .info {
      ul {
        li {
          width: 100%;
          margin-bottom: 42px;
          .name {
            color: #9f8283;
            margin-bottom: 10px;
            font-size: 18px;
          }
          .email {
            color: #666;
            font-size: 18px;
          }
        }
      }
    }
    .form-detail {
      width: 60%;
      margin-right: auto;
      ul {
        li {
          margin-bottom: 18px;
          .label {
            width: 100%;
            color: #3a3a3c;
            padding-bottom: 10px;
            font-size: 18px;
          }
          .input {
            width: 100%;
            height: 34px;
            border: 1px solid #eee;
            border-color: #3a3a3c !important;
            border-radius: 8px;
            input {
              height: 100%;
              width: 100%;
              padding: 0 10px;
              box-sizing: border-box;
              outline: none;
              border: 0;
              font-size: 16px;
              color: #333;
              border-radius: 8px;
            }
            textarea {
              width: 100%;
              resize: none;
              border: 0;
              height: 100%;
              padding: 10px;
              outline: none;
              font-size: 16px;
              color: #333;
              line-height: 20px;
              box-sizing: border-box;
              border-radius: 8px;
            }
          }
          .submit {
            padding: 8px 20px;
            background-color: #0089e5;
            color: #fff;
            border: 0px;
            font-size: 20px;
            display: inline-block;
            cursor: pointer;
            .borderRadius();
          }
        }
      }
    }
    .form-img {
      width: 30%;
      margin-left: auto;
      img {
        width: 100%;
      }
    }
  }
}
@media only screen and (max-width: 1366px) {
  .contactFrom-out {
    padding: 25px 0;
    .contactFrom {
      width: 83%;
    }
  }
}
@media only screen and (max-width: 768px) {
  .contactFrom-out {
    padding: 25px 0;
    .contactFrom {
      width: 96%;
      flex-wrap: wrap;
      flex-direction: column-reverse;
      margin: 0 auto;
      .form-detail {
        width: 100%;
      }
      .form-img {
        width: 60%;
        margin: 0 auto;
      }
      .title {
        font-size: 21px;
      }
      .form-detail {
        width: 100%;
      }
    }
  }
}
</style>
