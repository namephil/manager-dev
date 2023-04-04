import { Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Dialog = (props) => {
    return <h2>对话框组件</h2>
}

//     return(
//         <Form
//     name="basic"
//     labelCol={{
//       span: 8,
//     }}
//     wrapperCol={{
//       span: 16,
//     }}
//     style={{
//       maxWidth: 600,
//     }}
//     initialValues={{
//       remember: true,
//     }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="存储编码"
//       name="num"
//       rules={[
//         {
//           required: true,
//           message: '请输入',
//         },
//       ]}
//     >
//       <Input defaultValue={props.num}/>
//     </Form.Item>

    
//   </Form>
//     )
  

export default Dialog;