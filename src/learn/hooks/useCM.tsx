import React,{useState,useEffect,useCallback,useMemo} from 'react';
import styles from './index.module.scss'
import {getUserIdentity} from 'service/hook'

interface Item {
  title: string,
  onClick: () => void
  right: React.ReactNode
}
const USER_ROLE = [
  '无身份',
  '员工',
  '货主',
  '停用货主',
]
/*
  1. 使用useCallback、useMemo时,不要遗忘将使用到state,props添加依赖收集的数组中
  2. useCallback 适用于传递给子组件的函数以及useEffect用到的函数，其他情况下不推荐使用

*/ 


const useCM:React.FC = () =>  {
  const [role, setRole] = useState<number>(0);
  const [shopId, setShopId] = useState<number>(0);
  const [inviteCode, setInviteCode] = useState<string>('');

    // 申请员工一栏右侧文字
    const staffDesc = useMemo(() => {
      switch (role) {
        // 既不是员工也不是货主，点击跳转批发易小程序
        case 0: return (
          <div className="shop-type-null">
            去申请
          </div>
        )
        // 已是员工，点击无反应
        case 1: return(
          <div className="staff-apply">
            已是店铺员工
          </div>
        )
        // 已是货主，无法成为员工，点击无反应
        default: return (
          <div className="shop-type-null">
            货主不可申请
          </div>
        )
      }
    },[role])
    // 申请货主一栏右侧文字
    const consignorDesc = useMemo(() => {
      switch (role) {
        // 既不是员工也不是货主，点击跳转货主帮
        case 0: return (
          <div className="shop-type-null">
            去申请
          </div>
        )
        // 已是是员工，无法申请货主
        case 1: return(
          <div className="shop-type-null">
            员工不可申请
          </div>
        )
        // 已是货主，点击跳转货主帮小程序批发商详情
        case 2: return (
          <div className="consignor-entrance">
            已是货主，查看数据
          </div>
        )
        case 3: return (
          <div className="shop-type-null">
            已被停用，请联系店铺
          </div>
        )
      }
    },[role])

  const toStaffApply = useCallback(() => {
    console.log(`即将跳转去申请成为店铺id为${shopId}的员工`)
  },[shopId])

  const staffClick = useCallback(() => {
    // 既不是员工也不是货主，点击跳转批发易小程序
    if(role === 0) {
      toStaffApply()
    }
  },[role,toStaffApply])


  const toConsignorApply = useCallback(() => {
    console.log(`即将去货主帮申请成为货主,邀请码${inviteCode}`)
  },[inviteCode])
  const toConsignorDetail = useCallback(() => {
    console.log(`即将去货主帮申请成为货主,店铺id${shopId}`)
  },[shopId])
  const consignorClick = useCallback(() => {
    // 既不是员工也不是货主，点击跳转批发易小程序
    if(role === 0) {
      toConsignorApply()
    } else if(role === 2) {
      // 已是货主，点击跳转货主帮小程序批发商详情
      toConsignorDetail()
    }
  },[role,toConsignorApply,toConsignorDetail])


  const List = useMemo(() => {
    const list:Item[] = []
    list.push({
      title: '成为店铺员工',
      onClick: staffClick,
      right: staffDesc
    })
    list.push({
      title: '成为店铺货主',
      onClick: consignorClick,
      right: consignorDesc
    })
    return list
  },[staffDesc,consignorDesc,staffClick,consignorClick])

  useEffect(() => {
      getUserIdentity()
        .then(res => {
          const {user_role,shop_id,invite_code} = res
          console.log(`shop:${shop_id},${USER_ROLE[user_role]},inviteCode: ${invite_code}`)
          setRole(user_role)
          setShopId(shop_id)
          setInviteCode(invite_code)
        })
        .catch(e => {
          console.error(e)
        })
  },[]);

  return (
    <div className="App">
        <ul>
            {
              List.map((item,index) => {
                return <li onClick={() => item.onClick()} className={styles['item']} key={index}>
                  <div className={styles['item-left']}>{item.title}</div>
                  {item.right}
                </li>
              })  
            }
        </ul>
    </div>
  );
}

export default useCM;
