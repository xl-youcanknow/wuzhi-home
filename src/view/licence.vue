<template>
  <div class="licence">
    <el-row :gutter="10">
      <el-col :md="{span:18,offset:3}" align="center">
        <el-row :gutter="10">
          <el-col :sm="12" :md="6" v-for="(item,index) in list" :key="index" align="center">
            <div class="detail">
              <h3 class="title">{{item.title}}</h3>
              <div class="users">{{item.users}} Users</div>
            </div>
            <el-input-number v-model="item.qty" size="mini" :min="0"></el-input-number>
          </el-col>
        </el-row>
        <el-button type="primary" class="submit" @click="gobuy">Email to buy</el-button>
      </el-col>
    </el-row>
    <el-dialog title="Purchase Details" :visible.sync="EmailDialog" :close-on-click-modal="false">
      <el-form :model="form">
        <el-row :gutter="10">
          <el-col :md="12">
            <el-form-item label="Email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="Verification Code">
              <el-input v-model="form.code">
                <template slot="append">
                  <el-button type="text" v-show="!coderun" @click="getcode" :loading="codeLoad">
                    <span class="getcode">Get Code</span>
                  </el-button>
                  <span v-show="coderun">{{codeTime}}</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item>
              <el-input v-model="form.mark" placeholder="Remarks"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="buylist" class="email-table" style="width: 100%">
        <el-table-column prop="title" label="Package Type"></el-table-column>
        <el-table-column prop="users" label="Users"></el-table-column>
        <el-table-column prop="qty" label=" Quantity"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EmailDialog = false">Cancel</el-button>
        <el-button type="primary" :loading="saveload" @click="save">Send</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sendemail, emailBuy } from "@/api/index";
export default {
  name: "licence",
  data() {
    return {
      EmailDialog: false,
      saveload: false,
      coderun: false,
      codeLoad: false,
      codeTime: 60,
      form: {
        email: "",
        code: "",
        mark: ""
      },
      buylist: [],
      list: [
        {
          title: "License Level A",
          users: "50",
          qty: 0
        },
        {
          title: "License Level B",
          users: "200",
          qty: 0
        },
        {
          title: "License Level C",
          users: "500",
          qty: 0
        },
        {
          title: "License Level D",
          users: "1000",
          qty: 0
        }
      ]
    };
  },
  methods: {
    gobuy() {
      this.buylist = [];
      this.list.forEach(e => {
        if (e.qty > 0) {
          this.buylist.push(e);
        }
      });
      if (this.buylist.length > 0) {
        this.EmailDialog = true;
      } else {
        this.$message({
          message: "Please choose licenses",
          type: "warning"
        });
      }
    },
    getcode() {
      let EmailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!EmailReg.test(this.form.email)) {
        this.$message.error("Mailbox error");
      } else {
        if (!this.codeLoad) {
          this.codeLoad = true;
          sendemail({ email: this.form.email }).then(res => {
            if (res.code == 1) {
              let times = setInterval(() => {
                this.coderun = true;
                this.codeTime--;
                if (this.codeTime == 0) {
                  clearInterval(times);
                  this.codeLoad = false;
                  this.codeTime = 60;
                  this.coderun = false;
                }
              }, 1000);
            }
          });
        }
      }
    },
    save() {
      let EmailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (EmailReg.test(this.form.email) && this.form.code.length > 0) {
        this.saveload = true;
        emailBuy({
          list: this.buylist,
          code: this.form.code,
          email: this.form.email,
          remark: this.form.mark
        }).then(res => {
          if (res.code == 1) {
            this.$message.success("Success");
            this.EmailDialog = false;
            this.form.code = "";
            this.form.mark = "";
          } else {
            this.$message.error(res.content);
          }
          this.saveload = false;
        });
      } else {
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.licence {
  padding: 100px 15px 280px;
  .detail {
    padding: 20px 10px;
    border: 1px solid #dce0e6;
    -o-border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    & > * {
      width: 100%;
      color: #999;
      text-align: center;
    }
    &:hover {
      background-color: #3b67b9;
      & > * {
        color: #fff !important;
      }
    }
  }
  .title {
    font-size: 14px;
    height: 32px;
    line-height: 32px;
  }
  .users {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    font-size: 26px;
    font-weight: bold;
    margin: 10px 0;
    color: #666;
  }
  .getcode {
    display: inline-block;
    cursor: pointer;
    color: #333;
    font-size: 16px !important;
    padding: 0 10px;
  }
  .submit {
    margin-top: 100px;
    background-color: #3b67b9;
    border: #3b67b9;
  }
}
</style>
<style lang="less">
.email-table .cell {
  font-size: 14px !important;
}
@media screen and (max-width: 768px) {
  .licence .el-dialog {
    width: 90% !important;
  }
}
</style>
