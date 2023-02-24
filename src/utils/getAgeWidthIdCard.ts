export default function (IDCard) {
  const age = 0;
  let yearBirth = '';
  let monthBirth = '';
  let dayBirth = '';
  //获取用户身份证号码
  const userCard = IDCard;
  //如果身份证号码为undefind则返回空
  if (!userCard) {
    return age;
  }
  const reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/; //验证身份证号码的正则
  if (reg.test(userCard)) {
    if (userCard.length == 15) {
      const org_birthday = userCard.substring(6, 12);
      //获取出生年月日
      yearBirth = '19' + org_birthday.substring(0, 2);
      monthBirth = org_birthday.substring(2, 4);
      dayBirth = org_birthday.substring(4, 6);
    } else if (userCard.length == 18) {
      //获取出生年月日
      yearBirth = userCard.substring(6, 10);
      monthBirth = userCard.substring(10, 12);
      dayBirth = userCard.substring(12, 14);
    }
    //获取当前年月日并计算年龄
    const myDate = new Date();
    const monthNow = myDate.getMonth() + 1;
    const dayNow = myDate.getDate();
    let age = myDate.getFullYear() - yearBirth;
    if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
      age--;
    }
    //返回年龄
    return age;
  } else {
    return '';
  }
}
