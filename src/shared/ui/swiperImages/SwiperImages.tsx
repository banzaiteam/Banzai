'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import './SwiperImages.scss'
import Image, { type StaticImageData } from 'next/image'
import { ArrowIosBackOutline, ArrowIosForward } from '@/assets/icons/components'
import Palm from '../../../assets/images/Palm.png'
import clsx from 'clsx'
type Props = {
  images: Array<StaticImageData | string>

  size?: 'small' | 'medium' | 'large'
  paginationGap?: string
}

export const SwiperImages = (props: Props) => {
  const { images, size: size = 'medium' } = props
  const navigationPrevRef = useRef<HTMLButtonElement>(null)
  const navigationNextRef = useRef<HTMLButtonElement>(null)

  const isActive = images.length > 1

  const pagination = {
    clickable: true,
  }

  const navigation = {
    prevEl: navigationPrevRef.current,
    nextEl: navigationNextRef.current,
  }
  const keyboard = {
    enabled: true,
    onlyInViewport: true,
  }

  const imageSlides = images.map((urlImage, index) => (
    <SwiperSlide
      key={`${urlImage}` + index}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${images.length}`}
      data-id={'swiper-slide-' + (index + 1)}
    >
      <Image
        src={urlImage || Palm}
        width={485}
        height={562}
        alt={'image post'}
        priority={index === 0}
      />
    </SwiperSlide>
  ))

  return (
    <Swiper
      pagination={isActive && pagination}
      navigation={isActive && navigation}
      keyboard={isActive && keyboard}
      onBeforeInit={swiper => {
        if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
          const navigation = swiper.params.navigation
          navigation.prevEl = navigationPrevRef.current
          navigation.nextEl = navigationNextRef.current
        }
      }}
      onInit={swiper => {
        // Обновление навигации после инициализации
        swiper.navigation.init()
        swiper.navigation.update()
      }}
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
      modules={[Pagination, Navigation, Keyboard]}
      className={clsx('swiper', size)}
      data-id={'swiper-wrapper'}
    >
      {imageSlides}
      {isActive && (
        <>
          <button
            type={'button'}
            ref={navigationPrevRef}
            data-id={'navigation-swiper-prev-button'}
            className={'prev_arrow_button'}
          >
            <ArrowIosBackOutline width={48} height={48} viewBox={'0 0 24 24'} />
          </button>
          <button
            type={'button'}
            ref={navigationNextRef}
            data-id={'navigation-swiper-next-button'}
            className={'next_arrow_button'}
          >
            <ArrowIosForward width={48} height={48} viewBox={'0 0 24 24'} />
          </button>
        </>
      )}
    </Swiper>
  )
}
