import React, { useEffect, useMemo, useState }  from "react";
import { useSelector } from 'react-redux';
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from 'react-router-dom';

function ExtraSecurity(){
  const extra_security = useSelector(state => state.resetPassword.extra_security);
  const [security, setSecurity] = useState({});
  const history = useHistory();
  console.log("extra_security", history)
  // useEffect(()=>{
  //   if(extra_security && Object.keys(extra_security).length === 0) {
  //     history.push(`/reset-password/`)
  //   }
  // }, [extra_security]);

//   useEffect(() => {
//     if (extra_security) {
//       console.log("useEffect")
//         const listener = e => {
//             e.preventDefault();
//             console.log(extra_security, ' useEffect - touchmove');
//         };

//         document.body.addEventListener('touchmove', listener, { passive: false });

//         return () => {
//             document.body.removeEventListener('touchmove', listener);
//         }
//     }
// }, [extra_security]);

// useMemo(() => {
//   saveExtraSecurity(extra_security)
// }, [extra_security]);

// const saveExtraSecurity =()=>{
//   setSecurity(extra_security);
//   console.log("security", security)
// }



  return (
    <>
      <p className="heading">Extra Security</p>
    </>
  ) 
}

ExtraSecurity.propTypes = {
};

export default i18n(ExtraSecurity);