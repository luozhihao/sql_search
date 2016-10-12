import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Select, Button, Card, Table, message } from 'antd'

import 'fetch-polyfill'
import 'whatwg-fetch'
require('es6-promise').polyfill()

let editor

const FormItem = Form.Item
const Option = Select.Option
const columns = [{
    title: '表名一',
    dataIndex: 'name',
}, {
    title: '表名二',
    dataIndex: 'gender',
}, {
    title: '表名三',
    dataIndex: 'email',
}];

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            loading: false,
            data: [
                /*{name: 'luozh', gender: 'man', email: '121213'},
                {name: 'luozh', gender: 'man', email: '121213'},
                {name: 'luozh', gender: 'man', email: '121213'},
                {name: 'luozh', gender: 'man', email: '121213'},
                {name: 'luozh', gender: 'man', email: '121213'},
                {name: 'luozh', gender: 'man', email: '121213'},
                {name: 'luozh', gender: 'man', email: '121213'},
                {name: 'luozh', gender: 'man', email: '121213'},
                {name: 'luozh', gender: 'man', email: '121213'},
                {name: 'luozh', gender: 'man', email: '121213'},*/
            ]
        }
    }

    componentDidMount() {
        this.getUser()

        let Mode = ace.require("ace/mode/sql").Mode

        editor = ace.edit("editor")
        editor.setTheme("ace/theme/sqlserver")
        editor.setFontSize(16)
        editor.setPrintMarginColumn(-10)
        editor.session.setMode(new Mode())
    }

    submit = () => {
        console.log(editor.getValue())
    }

    clear = () => {
        editor.setValue('', -1)
    }

    // 获取用户名
    getUser = () => {
        return fetch('/userinfo/', {
                method: 'POST',
                credentials: 'include'
            })
            .then((res) => { return res.json() })
            .then((data) => {
                this.setState({
                    username: data.username
                })
            })
    }

    // 退出
    logout = () => {
        fetch('/logout/', {
                method: 'POST',
                credentials: 'include'
            })
            .then((res) => { return res.json() })
            .then((data) => {
                location.href="/"
            })
    }

    render() {
        const { loading } = this.state

        return(
            <div className="main">
                <Card
                    title="计费数据库查询工具" 
                    extra={<a href="#" onClick={this.logout}>退出</a>} 
                    style={{ width: '70%', margin: '0 auto' }}
                >
                    <Form inline className="search-box">
                        <FormItem
                           label="分站"
                        >
                            <Select
                                style={{ width: 200 }}
                                placeholder="请选择"
                            >   
                                <Option value="1">分站名一</Option>
                                <Option value="2">分站名二</Option>
                                <Option value="3">分站名三</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    <div id="editor"></div>
                    <div className="text-center mt20">
                        <Button type="primary" size="large" icon="search" loading={loading} onClick={this.submit}>查询</Button>
                        &nbsp;&nbsp;
                        <Button type="default" size="large" icon="reload" onClick={this.clear}>清空</Button>
                    </div>
                    <Table className="mt20" columns={columns}
                        dataSource={this.state.data}
                        pagination={false}
                        loading={this.state.loading}
                        size="small"
                    />
                </Card>
            </div>
        )
    }
}

App = Form.create()(App);

const getData = state => {
    return {

    }
}

export default connect(getData)(App)