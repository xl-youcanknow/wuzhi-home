<template>
  <div>
    <div class="ad">
      <div class="wrap">
        <div class="nav_tit">
          <h1>素材中心</h1>
          <h2>Materia center</h2>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="filter-box">
        <el-card shadow="never" class="box-card">
          <div class="filter-section">
            <div class="filter-title">媒材类型：</div>
            <div class="filter-options">
              <el-button
                v-for="opt in mediaTypes"
                :key="opt"
                size="mini"
                :type="mediaSelected === opt ? 'primary' : 'default'"
                plain
                @click="mediaSelected = opt"
                >{{ opt }}</el-button
              >
            </div>
          </div>
          <el-divider></el-divider>
          <div class="filter-section">
            <div class="filter-title">应用类型：</div>
            <div class="filter-options">
              <el-button
                v-for="opt in appTypes"
                :key="opt"
                size="mini"
                :type="appSelected === opt ? 'primary' : 'default'"
                plain
                @click="appSelected = opt"
                >{{ opt }}</el-button
              >
            </div>
          </div>
          <div class="filter-actions">
            <div class="sort-group">
              <span>排序：</span>
              <el-radio-group v-model="sortSelected" size="mini">
                <el-radio-button label="默认排序"></el-radio-button>
                <el-radio-button label="发布时间"></el-radio-button>
                <el-radio-button label="热度"></el-radio-button>
                <el-radio-button label="大小"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="search-group">
              <el-input
                v-model="searchKeyword"
                placeholder="按照素材名称查找"
                size="mini"
                clearable
              >
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </el-card>
      </div>

      <div class="material-list">
        <div class="empty">
          <img src="../assets/empty.png" alt="" />
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      mediaTypes: [
        '全部',
        '文本类',
        '视频类',
        '富媒体',
        '微课类',
        '虚拟仿真类',
        '动画类',
        '其他',
        '图形/图像类',
        'PPT演示文稿',
        '网页课件',
        '音频类',
      ],
      appTypes: [
        '全部',
        '专业标准',
        '行业标准',
        '教学日历',
        '工程案例',
        '实习/实训学习',
        '学生作品',
        '专业资料',
        '专业动态',
        '专业调研',
        '职业认证',
        '学习指南',
        '教学名录',
        '教学图像',
        '教学案例',
        '电子教材',
        '文献索引',
        '模型实训',
        '名词解释',
        '其他',
        '行业信息',
        '技能竞赛',
        '教学设计',
        '电子书籍',
        '教学示例',
        '教学课件',
        '学习作业',
        '教学系统',
        '拓展阅读',
      ],
      mediaSelected: '全部',
      appSelected: '全部',
      sortSelected: '默认排序',
      searchKeyword: '',
    };
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../css/style2.css';
.filter-box {
  margin-top: 20px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}
.filter-section {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}
.filter-title {
  width: 90px;
  color: #666;
  font-size: 14px;
  line-height: 24px;
}
.filter-options {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.sort-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 0;
}
.search-group {
  margin-right: 0;
  width: 300px;
}

.material-list {
  min-height: 300px;
  margin-top: 20px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  background: #fff;
  margin-bottom: 20px;

  .empty {
    padding-top: 50px;
    text-align: center;
  }
  p {
    color: #999;
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
