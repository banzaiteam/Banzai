export const calendarStyle = `
  .air-datepicker {
    --adp-width: 252px;
    display: block !important;
  }

  .custom-airdatepicker {
    background-color: var(--dark-500);
    border: 1px solid var(--dark-300);
    border-radius: 2px;
    padding: 18px 24px;
    box-sizing: border-box;
  }

  /* Стили для header */
  .custom-airdatepicker .air-datepicker-nav {
      border: none;
      min-height: 36px;
      min-width: 252px;
      position: relative;
  }

  .custom-airdatepicker .air-datepicker-nav--title {
    order: -1;
    color: var(--light-100);
    font-family: var(--font-family), sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    transition: all 0.3s;
  }

  .custom-airdatepicker .air-datepicker-nav--title:hover {
    background-color: var(--dark-100);
  }

  .custom-airdatepicker .air-datepicker-nav--action[data-action="prev"] {
    position: absolute;
    right: 40px;
  }

  .custom-airdatepicker .air-datepicker-nav--action {
    width: 36px;
    display: flex;
    justify-content: center;
    transition: all 0.3s;
  }

  .custom-airdatepicker .air-datepicker-nav--action svg {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--dark-100);
  }

  .custom-airdatepicker .air-datepicker-nav--action svg path {
    stroke: var(--light-100);
  }

  .custom-airdatepicker .air-datepicker-nav--action:hover {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--dark-100);
  }

  .custom-airdatepicker .air-datepicker-nav--action:hover svg path {
    stroke: var(--primary-500); /* Изменение цвета обводки */
    transition: stroke 0.2s ease; /* Плавное изменение */
  }

  .custom-airdatepicker .air-datepicker-body--cells {
    gap: 4px 0px;
  }

  /* Стили для контейнера дней недели */
  .custom-airdatepicker .air-datepicker-body--day-names {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  /* Стили для каждого дня недели */
  .custom-airdatepicker .air-datepicker-body--day-name {
    color: var(--light-900);
    font-family: var(--font-family), sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: var(--line-height-normal);
    flex: 1;
    text-align: center;
    text-transform: capitalize;
    padding: 8px 6px;
  }

  /* Базовый стиль дня */
  .custom-airdatepicker .air-datepicker-cell.-day- {
    transition: all 0.2s ease;
  }

  /* Active (момент клика) */
  .custom-airdatepicker .air-datepicker-cell.-day-.-active- {
    background: var(--primary-900) !important;
    border-radius: 50% !important;
  }

  /* Выбранный день (после клика) */
  .custom-airdatepicker .air-datepicker-cell.-day-.-selected- {
    background: var(--primary-900) !important;
    color: var(--light-100) !important;
    border-radius: 50% !important;
  }

  /* Focus */
  .custom-airdatepicker .air-datepicker-cell.-day-.-focus- {
    background: var(--dark-500) !important;
    border: 1px solid var(--primary-300) !important;
    border-radius: 50% !important;
  }

  /* Hover (только для невыбранных дней) */
  .custom-airdatepicker .air-datepicker-cell.-day-:not(.-selected-):hover {
    background: var(--primary-700) !important;
    border-radius: 50% !important;
    border: none !important;
  }

  /* Стили для диапазона */
  .custom-airdatepicker .air-datepicker-cell.-day-.-in-range- {
    background: var(--primary-900) !important;
    color: var(--light-100) !important;
    border-radius: 0 !important;
  }

  /* Первый день диапазона */
  .custom-airdatepicker .air-datepicker-cell.-day-.-selected-.-range-from-:not(.-range-to-) {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  /* Последний день диапазона */
  .custom-airdatepicker .air-datepicker-cell.-day-.-selected-.-range-to-:not(.-range-from-) {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
`