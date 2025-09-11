'use client'
import React, { useEffect, useRef } from 'react'
import { Swiper, type SwiperProps, SwiperSlide } from 'swiper/react'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import './SwiperImages.scss'
import Image, { type StaticImageData } from 'next/image'
import { ArrowIosBackOutline, ArrowIosForward } from '@/assets/icons/components'
import Palm from '../../../assets/images/Palm.png'
import clsx from 'clsx'
import { Swiper as SwiperType } from 'swiper/types'

type Props = SwiperProps & {
  images: Array<StaticImageData | string>
  size?: 'small' | 'medium' | 'large'
}

const INDEX_FIRST = 0

export const SwiperImages = (props: Props) => {
  const { images, size = 'medium', ...rest } = props
  const navigationPrevRef = useRef<HTMLButtonElement>(null)
  const navigationNextRef = useRef<HTMLButtonElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
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

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }
  useEffect(() => {
    // Добавляем обработчик клика к контейнеру пагинации после инициализации Swiper
    if (swiperRef.current && swiperRef.current.pagination && swiperRef.current.pagination.el) {
      const paginationEl = swiperRef.current.pagination.el

      const handlePaginationClick = (e: Event) => {
        e.stopPropagation()
      }

      paginationEl.addEventListener('click', handlePaginationClick)

      // Очистка при размонтировании компонента
      return () => {
        paginationEl.removeEventListener('click', handlePaginationClick)
      }
    }
  }, [])

  const imageSlides = images.map((urlImage, index) => (
    <SwiperSlide
      key={`${urlImage}` + `${index}`}
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
        priority={index === INDEX_FIRST}
      />
    </SwiperSlide>
  ))

  return (
    <Swiper
      onSwiper={swiper => {
        swiperRef.current = swiper
      }}
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
      {...rest}
    >
      {imageSlides}
      {isActive && (
        <>
          <button
            type={'button'}
            ref={navigationPrevRef}
            data-id={'navigation-swiper-prev-button'}
            className={'prev_arrow_button'}
            onClick={onClickHandler}
          >
            <ArrowIosBackOutline width={48} height={48} viewBox={'0 0 24 24'} />
          </button>
          <button
            type={'button'}
            ref={navigationNextRef}
            data-id={'navigation-swiper-next-button'}
            className={'next_arrow_button'}
            onClick={onClickHandler}
          >
            <ArrowIosForward width={48} height={48} viewBox={'0 0 24 24'} />
          </button>
        </>
      )}
    </Swiper>
  )
}
