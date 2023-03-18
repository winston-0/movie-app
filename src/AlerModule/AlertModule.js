import { Alert, Space } from 'antd';

export default function AlerModule({text}) { 
return (
    <Alert
        message="Error"
        description={text}
        type="error"
        showIcon
    />
  )
}