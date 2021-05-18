<template>
  <div class="card-carousel-wrapper">
    <div
      class="card-carousel--nav__left"
      @click="moveCarousel(-1)"
      :disabled="atHeadOfList"
    ></div>
    <div class="card-carousel">
      <div class="card-carousel--overflow-container">
        <div
          class="card-carousel-cards"
          :style="{
            transform: 'translateX' + '(' + currentOffset + 'px' + ')',
          }"
        >
          <div
            :class="
              scrollIndex == index
                ? 'card-carousel--card card-carousel--card-active'
                : 'card-carousel--card'
            "
            v-for="(item, index) in items"
            :key="index"
            @click="scrollIndex = index"
          >
            <img
              src="http://pic.netbian.com/uploads/allimg/180726/192524-15326043240a4f.jpg"
            />
            <div class="card-carousel--card--footer">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="card-carousel--nav__right"
      @click="moveCarousel(1)"
      :disabled="atEndOfList"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollIndex: 0,
      currentOffset: 0,
      windowSize: 6,
      paginationFactor: 176,
      items: [
        { name: "Tycoon Thai", tag: "Thai" },
        { name: "Ippudo", tag: "Japanese" },
        { name: "Milano", tag: "Pizza" },
        { name: "Tsing Tao", tag: "Chinese" },
        { name: "Frances", tag: "French" },
        { name: "Burma Superstar", tag: "Burmese" },
        { name: "Salt and Straw", tag: "Ice cream" },
      ],
    };
  },
  computed: {
    atEndOfList() {
      return (
        this.currentOffset <=
        this.paginationFactor * -1 * (this.items.length - this.windowSize)
      );
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: #666a73;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 900px;
}
.card-carousel--overflow-container {
  overflow: hidden;
}
.card-carousel--nav__left,
.card-carousel--nav__right {
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 2px solid #42b883;
  border-right: 2px solid #42b883;
  cursor: pointer;
  margin: 0 10px;
  transition: transform 150ms linear;
}
.card-carousel--nav__left[disabled],
.card-carousel--nav__right[disabled] {
  opacity: 0.2;
  border-color: black;
}
.card-carousel--nav__left {
  transform: rotate(-135deg);
  &:active {
    transform: rotate(-135deg) scale(0.9);
  }
}
.card-carousel--nav__right {
  transform: rotate(45deg);
  &:active {
    transform: rotate(45deg) scale(0.9);
  }
}
.card-carousel-cards {
  width: 176 * 10px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);
  .card-carousel--card {
    position: relative;
    background-color: #fff;
    height: 130px;
    cursor: pointer;
    border-right: 1px solid rgba(13, 13, 15, 0.1);
    &::before {
      display: none;
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 4px;
      background: #ee612d;
      border-radius: 2px;
    }
    img {
      margin: 25px auto 23px auto;
      display: block;
      width: 40px;
      height: 40px;
      transition: opacity 150ms linear;
    }
    .card-carousel--card--footer {
      text-align: center;
      width: 175px;
      border-top: 0;
      font-size: 14px;
      color: #0d0d0f;
    }
  }
  .card-carousel--card-active {
    background-color: #4444e5;
    &::before {
      display: block;
    }
    .card-carousel--card--footer {
      color: #fff;
    }
  }
}
</style>