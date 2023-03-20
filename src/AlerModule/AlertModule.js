import { Alert, Space } from 'antd';

export default function AlerModule({type,text}) { 
return (
    <Alert
        className='alertModule'
        message = {text}
        type= {type}
        showIcon
    />
  )
}