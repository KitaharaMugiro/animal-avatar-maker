import Loading from '../../Loading';
import React, {useState, useEffect} from 'react'

export default function ShowLoading() {
  const [ isShowLoading, setIsShowLoading ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShowLoading(true); // ローディング完了
    }, 1000);
  });

  return (
    <div>
      <Loading isShow={ isShowLoading }  />
    </div>
  );
}