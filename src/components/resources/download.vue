<template>
  <div class="view-wallpaper-page">
    <div class="serch-container">
      <div class="search">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="Search" v-model="file_name">
      </div>
      <div class="search-btn" @click="fetch(1)">Search</div>
    </div>
    <div class="head">Okportal {{headTitle.replace(/,/g, " ")}}</div>
    <div class="list-table">
      <div class="pc-table" v-if="width>768">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column label="Name">
            <template slot-scope="scope">
              <a :href="urlPath+scope.row.file_path" download>
                <img src="@/public/img/resdetail/list-img-icon.png" alt>
                <span class="img-text">{{scope.row.file_name}}</span>
              </a>
            </template>
          </el-table-column>
          <el-table-column prop="update_time" label="Last Modified" width="174" align="center"></el-table-column>
          <el-table-column prop="file_size" label="File Size" width="140" align="center"></el-table-column>
          <el-table-column prop="src" label width="102" align="center">
            <template slot-scope="scope">
              <a :href="urlPath+scope.row.file_path" download class="el-icon-download" target="_bank"></a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--移动端-->
      <div class="mobile-table" v-else v-loading="loading">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="Last Modified :">
                  <span>{{ scope.row.update_time }}</span>
                </el-form-item>
                <el-form-item label="File Size :">
                  <span>{{ scope.row.file_size }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="file_name"></el-table-column>
          <el-table-column prop="Download" label width="102" align="center">
            <template slot-scope="scope">
              <a :href="urlPath+scope.row.file_path" download class="el-icon-download"></a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="share-page">
      <el-pagination
        @current-change="handleSizeChange"
        background
        layout="prev, pager, next"
        :total="sharePage.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllList } from "@/api/index";
export default {
  data() {
    return {
      msg: "home",
      width: document.body.clientWidth,
      tableData: [],
      urlPath:null,
      rid:null,
      loading:false,
      headTitle:'',
      file_name:'',
      sharePage: {
        total: 0
      },
    };
  },
  created() {
    this.rid = this.$route.query.id;
    this.fetch(1);
  },
  methods: {
    handleSizeChange(i) {
      this.fetch(i);
    },
    fetch(page_no){
      this.loading = true;
      getAllList({type_id:this.rid,page_no:page_no,page_size:10,file_name:this.file_name}).then(res=>{
        this.loading = false;
        this.urlPath = res.data.file_path;
        this.tableData = res.data.list;
        this.sharePage.total = res.data.total_count;
        this.headTitle = res.data.parent_category_name+' '+res.data.category_name
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.view-wallpaper-page {
  .share-page {
    width: 100%;
    text-align: center;
    margin-top: 100px;
  }
  border-top: 8px solid #2d337f;
  width: 80%;
  max-width: 1190px;
  margin: 20px auto;
  padding-top: 50px;
  padding-bottom: 70px;
  & > * {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  .serch-container{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .search-btn{
      width: 100px;
      text-align: center;
      background: #2d337f;
      color: #ffffff;
      padding: 10px 0;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      -o-border-radius: 6px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .search {
    font-size: 24px;
    padding: 12px 24px;
    background-color: #f4f6f9;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    -o-border-radius: 12px;
    border-radius: 12px;
    display: flex;
    display: -webkit-flex;
    width: 815px;
    box-sizing: border-box;
    .el-icon-search {
      display: flex;
      display: -webkit-flex;
      color: #444446;
    }
    input[type="text"] {
      display: flex;
      display: -webkit-flex;
      height: 100%;
      border: none;
      outline: none;
      width: 750px;
      background-color: transparent;
      box-sizing: border-box;
      padding: 0 20px;
      input:-ms-input-placeholder {
        color: #37373a;
      } 
      input::-webkit-input-placeholder {
        color: #37373a;
      } 
      input::-moz-placeholder {
        color: #37373a;
      }
      input:-moz-placeholder {
        color: #37373a;
      } 
    }
  }
  .head {
    padding: 14px 0;
    color: #393c83;
    font-size: 20px;
    border-top: 2px solid #989a9e;
    border-bottom: 2px solid #989a9e;
    margin-bottom: 10px;
    font-weight: 500;
    text-transform: Capitalize 
  }
  .list-table {
    .img-text {
      display: inline-block;
      margin-left: 20px;
      font-size: 22px;
      color: #525152;
    }
  }
  .mobile-table {
    .el-form-item {
      width: 100%;
      margin-bottom: 0px;
    }
  }
}
</style>
<style lang="less">
.view-wallpaper-page {
  & > * {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  .list-table {
    thead .cell {
      color: #45498d !important;
      font-size: 18px !important;
    }
    .el-table tr {
      padding: 0 20px;
    }
    .el-table th.is-leaf {
      // border-bottom:1px solid #f40;
    }
    .el-icon-download {
      font-size: 24px !important;
      font-weight: bold;
      color: #a0a2a5;
    }
  }
}
@media screen and(max-width:768px) {
  .view-wallpaper-page {
    .serch-container{
      width: 100%;
      flex-wrap: wrap;
      .search{
        width: 100%;
      }
      .search-btn{
        margin-top: 15px;
        margin-left: auto;
      }
    }
  }
}
</style>

