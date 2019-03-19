  <template>
  <el-tabs type="border-card">
    <el-tab-pane label="添加好友">
      <el-row class="flex">
        <el-input icon="search" placeholder="昵称搜索或用户号搜索" v-model="keyword" @keyup.enter.native="getAccountList" class="search-input" />
        <el-button type="primary" icon="el-icon-search" @click="getAccountList">搜索</el-button>
      </el-row>
      <el-table v-loading="loading" :data="accountList" style="width: 100%" :expand-row-keys="currentKey" row-key="id">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="昵称">
                <span>{{ props.row.nickName }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.sex | sex}}</span>
              </el-form-item>
              <el-form-item label="用户No">
                <span>{{ props.row.userNo }}</span>
              </el-form-item>
              <el-form-item label="用户ID">
                <span>{{ props.row.uid }}</span>
              </el-form-item>
              <el-form-item label="签名">
                <span>{{ props.row.signature || '-' }}</span>
              </el-form-item>
              <el-form-item label="生日">
                <span>{{ props.row.birthday | birthday }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户No" prop="userNo">
        </el-table-column>
        <el-table-column label="昵称" prop="nickName">
        </el-table-column>
        <el-table-column label="操作" prop="">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="添加聊天室">
      <el-table :data="accountList" style="width: 100%" :expand-row-keys="currentKey" row-key="id">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="昵称">
                <span>{{ props.row.nickName }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.sex | sex}}</span>
              </el-form-item>
              <el-form-item label="用户ID">
                <span>{{ props.row.uid }}</span>
              </el-form-item>
              <el-form-item label="签名">
                <span>{{ props.row.signature || '-' }}</span>
              </el-form-item>
              <el-form-item label="生日">
                <span>{{ props.row.birthday | birthday }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="群 ID" prop="uid">
        </el-table-column>
        <el-table-column label="群名称" prop="nickName">
        </el-table-column>
        <el-table-column label="操作" prop="">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      currentKey: null,
      keyword: null,
      accountList: null,
      loading: null
    };
  },

  mounted() {
    this.getAccountList();
  },

  methods: {
    getAccountList() {
      this.loading = true;
      this.axios({
        url: "friend/search",
        params: {
          keyword: this.keyword
        }
      })
        .then(res => {
          this.accountList = res;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },

    rowKeyFun(event) {
      return event.id;
    },

    handleEdit(index, row) {
      this.currentKey = [row.id];
    },

    handleAdd(index, row) {
      this.axios({
        url: "friend/add",
        method: "post",
        data: {
          uid: row.uid
        }
      })
        .then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err.data.content || "添加失败，请重试",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style scoped>
.search-input {
  max-width: 300px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>