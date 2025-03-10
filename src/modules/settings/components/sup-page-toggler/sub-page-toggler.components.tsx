import { Dispatch, FC, SetStateAction } from 'react';
import './sub-page-toggler.component.scss';
import classNames from "classnames";
import { SubPage } from "../../types/sub-page.type.ts";

interface Props {
  subPage: SubPage;
  setSubPage: Dispatch<SetStateAction<SubPage>>;
}

const SubPageToggler: FC<Props> = ({
  subPage,
  setSubPage
}) => {
  return (
    <div className="sub-page-toggler">
      <button
        className={classNames('sub-page-toggler__button', subPage === 'my-profile' && 'sub-page-toggler__button--active')}
        onClick={() => setSubPage('my-profile')}
      >
        My profile
      </button>
      
      <button
        className={classNames('sub-page-toggler__button', subPage === 'billing' && 'sub-page-toggler__button--active')}
        onClick={() => setSubPage('billing')}
      >
        Billing
      </button>
    </div>
  )
}

export default SubPageToggler;
