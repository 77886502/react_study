import React from 'react'
import styles from './index.module.scss'

interface ModalProps {
    // 对话框是否可见
    visible?:boolean

    // 标题
    title?: React.ReactNode;

    // 自定义对话框头部
    header?:React.ReactNode

    // 自定义对话框底部
    footer?:React.ReactNode


    onConfirm: Function

    // 是否有蒙层
    mask?:boolean
}

type Props = {

}

const Modal:React.FC<ModalProps> = props => {
    const { visible,title,header, onConfirm } = props
    return ( 
        <div className={styles['modal-container']}>
            {
                header?
                    header
                    :
                    <div className={styles['modal-header']}>
                        <div className={styles['modal-header-title']}>
                            {title}
                        </div>
                        <div className={styles['modal-header-close']}>
                        
                        </div>
                    </div>
            }
            <div className={styles['modal-main']}>
            
            </div>
            <div className={styles['modal-footer']}>
                
            </div>
        </div>
    );
}

export default Modal;