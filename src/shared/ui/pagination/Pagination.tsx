import styles from './Pagination.module.scss';
import {Bullet} from "@shared/ui/pagination/bullet/Bullet";
import {ArrowIosBack, ArrowIosForward} from "@/assets/icons/components";

type Props = {
  error?: boolean;
  errorMessage?: string;
};

export const Pagination: React.FC<Props> = ({
                                                 ...rest
                                               }) => {
  return (
    <div className={styles.wrapper}>
      <Bullet><ArrowIosBack /></Bullet>
      <Bullet >{1}</Bullet>
      <Bullet >{2}</Bullet>
      <Bullet >{3}</Bullet>
      <Bullet >{'...'}</Bullet>
      <Bullet >{6}</Bullet>
      <Bullet><ArrowIosForward/></Bullet>
    </div>
  );
};