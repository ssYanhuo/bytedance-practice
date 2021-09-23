import logo from './logo.svg';
import './App.css';
import { Menu, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css'
import { UnorderedListOutlined } from '@ant-design/icons'
const { SubMenu } = Menu;

function App() {
    return (
        <div className="App">
            <Row>
                <Col>
                    <h1><div id="logo"><img alt="logo" src={logo}/>Ant Design</div> </h1>
                </Col>
                <Col flex="1">
                    <div id="search-box">
                        <Input placeholder="搜索"/>
                    </div>
                </Col>
                <Col>
                    <Menu id="menu" mode="horizontal">
                        <Menu.Item>设计</Menu.Item>
                        <Menu.Item>文档</Menu.Item>
                        <Menu.Item>组件</Menu.Item>
                        <Menu.Item>资源</Menu.Item>
                        <Menu.Item>国内镜像</Menu.Item>
                        <SubMenu icon={<UnorderedListOutlined/>}>
                            <Menu.Item>1</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Col>


            </Row>

        </div>
    );
}

export default App;
