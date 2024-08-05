// pages/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,
    slides: [
      {
        progress: 0,
        swiperSlideOffset: 0,
      },
      {
        progress: -1,
        swiperSlideOffset: 240,
      },
      {
        progress: -2,
        swiperSlideOffset: 480,
      },
      {
        progress: -3,
        swiperSlideOffset: 720,
      },
      {
        progress: -4,
        swiperSlideOffset: 960,
      },
      {
        progress: -5,
        swiperSlideOffset: 1200,
      },
      {
        progress: -6,
        swiperSlideOffset: 1440,
      },
      {
        progress: -7,
        swiperSlideOffset: 1680,
      },
      {
        progress: -8,
        swiperSlideOffset: 1920,
      },
      {
        progress: -9,
        swiperSlideOffset: 2160,
      },
    ],
  },

  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this.onTranslateInit()
    },

  },

  ready() {
    // 在组件实例进入页面节点树时执行
    this.onTranslateInit()
    console.log('[my-component] ready')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTranslateInit() {
      const rtl = false

      const {slides, activeIndex} = this.data

      // 外界传参，默认值2
      const perSlideRotate = 2

      // 外界传参，默认值8
      const perSlideOffset = 8

      // 外界传参，默认值true
      const rotate = true

      // 触摸开始时的位移距离，暂时设为0
      const startTranslate = 0

      // 是否被触摸滑动，暂时设为false
      const isTouched = false

      // 当前位移距离，此处暂时设为0
      const currentTranslate = 0
      const newSlides = slides.map((ele, i) => {
        const slideEl = slides[i]
        const slideProgress = slideEl.progress
        const progress = Math.min(Math.max(slideProgress, -4), 4)
        const offset = slideEl.swiperSlideOffset

        let tX = -offset
        const tY = 0
        const tZ = -100 * Math.abs(progress)
        const scale = 1
        const rotate = -perSlideRotate * progress

        const tXAdd = perSlideOffset - Math.abs(progress) * 0.75

        const slideIndex = i

        if (progress < 0) {
          // next
          tX = `calc(${tX}px ${rtl ? '-' : '+'} (${tXAdd * Math.abs(progress)}%))`
        } else if (progress > 0) {
          // prev
          tX = `calc(${tX}px ${rtl ? '-' : '+'} (-${tXAdd * Math.abs(progress)}%))`
        } else {
          tX = `${tX}px`
        }

        const scaleString =
        progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`

        /* eslint-disable */
        const transform = `translate3d(${tX}, ${tY}, ${tZ}px) rotateZ(${rotate ? (rtl ? -rotate : rotate) : 0}deg) scale(${scaleString})`;

        return Object.assign({}, ele, {
          zIndex: -Math.abs(Math.round(slideProgress)) + slides.length,
          transform: transform
        })
      })
      this.setData({
        slides:newSlides
      })
    },
  },
})
