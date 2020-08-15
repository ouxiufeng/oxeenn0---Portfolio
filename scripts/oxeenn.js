let headerAnchor = document.getElementById("header");
let footerAnchor = document.getElementById("footer");
let goheaderButton = document.getElementById("goheader");
let gofooterButton = document.getElementById("gofooter");
let beforePosYcounter = 0;
let beforePosY = 0;

let anchorSmooth = function (clickButton, target) {
  clickButton.addEventListener("click", function () {
    target.scrollIntoView({
      behavior: "smooth"
    });
  }, false)
}

anchorSmooth(goheaderButton, headerAnchor)
anchorSmooth(gofooterButton, footerAnchor)

//回到頁首按鈕顯示控制
addEventListener("scroll", function () {
  if (beforePosYcounter > 3) {
    beforePosY = this.window.scrollY
    beforePosYcounter = 0
  }

  if (this.window.scrollY < 500) {
    goheaderButton.classList.remove("goheaderVisible")
    goheaderButton.classList.add("goheaderHidden")
    // console.log("TOP")
  } else if (this.window.scrollY >= (this.document.body.scrollHeight - this.window.innerHeight - 500)) {
    goheaderButton.classList.remove("goheaderHidden")
    goheaderButton.classList.add("goheaderVisible")
    // console.log("BOTTOM")
  } else if (beforePosY <= this.window.scrollY) {
    goheaderButton.classList.remove("goheaderHidden")
    goheaderButton.classList.add("goheaderVisible")
    // console.log("MIDDLE")
  } else if (beforePosY > this.window.scrollY) {
    goheaderButton.classList.remove("goheaderVisible")
    goheaderButton.classList.add("goheaderHidden")
    // console.log("MIDDLE")
  }


  beforePosYcounter++
}, false)


let worksdata = [
  {
    id: 1,
    url: "pagination/flower-shop/dist/index.html",
    img: "images/website-images/flower-shop-img.png",
    title: "花店",
    description: "電商平台(無後端)。",
    tag: ["電商", "Vue CLI", "RWD", "anime.js", "Swiper", "Masonry"]
  },
  {
    id: 2,
    url: "https://styeeings.herokuapp.com/",
    img: "images/website-images/styeeings-img.png",
    title: "StyeeingS",
    description: "CSS libraries.",
    tag: ["Nuxt.js", "RWD", "libraries"]
  },
  {
    id: 3,
    url: "pagination/styssing/dist/index.html",
    img: "images/website-images/styssing-img.png",
    title: "Styssing(Beta)",
    description: "視覺化操作界面，快速創建和測試基本按鈕。",
    tag: ["Vue CLI", "PC端", "工具", "Simonwep/pickr", "測試版"]
  },
  {
    id: 4,
    url: "pagination/cube-shop/index.html",
    img: "images/website-images/cube-shop-img.png",
    title: "方塊商店",
    description: "動畫實驗網站。",
    tag: ["動畫", "過渡", "RWD", "anime.js", "three.js"]
  },
  {
    id: 5,
    url: "pagination/thinking/index.html",
    img: "images/website-images/thinking.png",
    title: "創意思考",
    description: "動畫實驗網站。",
    tag: ["RWD", "動畫", "平滑滾動", "locomotive-scroll", "anime.js"]
  },
  {
    id: 6,
    url: "pagination/financial-management/index.html",
    img: "images/website-images/financial-management-img.png",
    title: "理財工具",
    description: "電腦版理財網站。",
    tag: ["PC端", "工具", "資料處理", "Vue.js", "Chart.js"]
  },


]

let vm = new Vue({
  el: "#main",
  data: {
    worksData: worksdata,
    tagWorksData: [],
    moreWorksAnime: false,
    moreWork: false,
    moreTagWork: false,
    disabled: false,
    moreButtonName: "更多"
  },
  methods: {
    //切換過渡動畫(參數 = true 為標籤過渡動畫, false 為顯示更多過渡動畫)
    //moreWork 為 true 表示全部資料樣式狀態, false 為少量資料樣式狀態
    //moreWork(更多顯示樣式狀態) 和 moreTagWork(標籤樣式狀態) 負責管理資料切換
    //資料切換會在 500 毫秒時進行計算和切換, 也就是 opacity 為 0 時
    //moreWorkAnime 在 0 毫秒時創建 'more-works-anime' class, 1000 毫秒刪除
    //disabled 在 0 毫秒時禁用按鈕, 1000 毫秒時釋放按鈕
    clearMoreWorkAnime: function (moreTagWorkswitch) {
      this.moreWorksAnime = true
      this.disabled = true

      setTimeout(() => {
        if (moreTagWorkswitch) {
          this.moreWork = true;
          this.moreTagWork = true;
        } else {
          this.moreTagWork = false;
          this.moreWork = !this.moreWork
        }
        this.moreWork ? (this.moreButtonName = '返回') : (this.moreButtonName = '更多')
      }, 500)

      setTimeout(() => {
        this.moreWorksAnime = false
        this.disabled = false
      }, 1000)

    },
    //標籤搜尋
    //計算及資料代換會在 500 毫秒時執行, 以防止動畫 opacity 未達 0 時就代換資料造成的視覺問題
    tagSearch: function (focTag) {

      setTimeout(() => {
        this.tagWorksData = []
        for (let i = 0; i < this.worksData.length; i++) {
          if (focTag == this.worksData[i].tag.filter(foc => foc == focTag)) {
            this.tagWorksData.push(this.worksData[i])
          }
        }
      }, 500)
      this.clearMoreWorkAnime(true)
    }

  },
  computed: {
    //判斷是否切換狀態
    worksDatadisplay: function () {
      if (this.moreTagWork) {
        return this.tagWorksData
      }

      if (!this.moreWork) {
        return this.worksData.slice(0, 4)
      } else {
        return this.worksData
      }
    },
  }

})
