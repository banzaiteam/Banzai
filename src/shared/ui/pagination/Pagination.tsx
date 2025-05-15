import styles from './Pagination.module.scss';
import {Bullet} from "@shared/ui/pagination/bullet/Bullet";
import {Icon} from "@shared/ui/icon/Icon";

type Props = {
  error?: boolean;
  errorMessage?: string;
};

export const Pagination: React.FC<Props> = ({
                                                 ...rest
                                               }) => {
  return (
    <div className={styles.wrapper}>
      <Bullet><Icon name={'arrow-ios-back'} stroke={'white'}/></Bullet>
      <Bullet >{1}</Bullet>
      <Bullet >{2}</Bullet>
      <Bullet >{3}</Bullet>
      <Bullet >{'...'}</Bullet>
      <Bullet >{6}</Bullet>
      <Bullet><Icon name={'arrow-ios-forward'} stroke={'white'}/></Bullet>
    </div>
  );
};