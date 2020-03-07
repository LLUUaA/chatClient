<template>
    <div class="friend-box">
        <template v-for="(data,index) in datas">
            <div class="item hover flex" :data-count="data.notReadCount" :class="{ current: index === currentIndex, 'not-read': data.notReadCount>0 }" :key="data.uid" @click="showChat(index)">
                <div class="avatar">
                    <img :src="data.avatar || defaultIcon">
                </div>
                <div class="right">
                    <div class="m-t flex">
                        <span class="name">{{data.nickName|| data.name || ''}}</span>
                        <span class="time">{{data.last.time}}</span>
                    </div>
                    <div class="content">{{data.last.content | decodeContent}}</div>
                </div>
            </div>
        </template>
        <div class="no-more" v-if="datas && datas.length === 0">
            <span>{{noDataText}}</span>
            <el-button type="text" @click="toSearchView">去添加</el-button>
        </div>
    </div>
</template>

<script>
import defaultUserIcon from "@/assets/icon-user-avatar.svg";
import defaultRoomIcon from "@/assets/icon-group-avatar.svg";

import { ASIDE_SEARCH_NUM, ROOM, SINGLE } from "@/service/constant";

export default {
  name: "friendsComponent",
  data() {
    return {
      defaultIcon: defaultUserIcon,
      currentIndex: null,
    };
  },

  props: {
    datas: Array,
    toViewPath: {
      type: String,
      default: '/index/search'
    },
    type: String,
    noDataText: {
      type: String,
      default: "还没有好友哦，添加好友进行聊天吧"
    }
  },

  watch: {
    type: function(oldval,newval) {
      // this.defaultIcon = 
      switch (newval) {
        case ROOM:
          this.defaultIcon = defaultRoomIcon;
          break;
        case SINGLE:
          this.defaultIcon = defaultUserIcon;
        break;
        default:
          break;
      }
    }
  },

  methods: {
    toSearchView() {
      this.$router.push(this.toViewPath);
    },
    // 聊天
    showChat(index) {
      this.$emit("show", index);
      this.currentIndex = index;
    }
  }
};
</script>
