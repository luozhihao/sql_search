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
                    extra={<a href="#">退出</a>} 
                    style={{ width: '70%', margin: '0 auto' }}
                >
                    <Form inline className="search-box">
                        <FormItem
                           label="下拉框"
                        >
                            <Select
                                style={{ width: 200 }}
                                placeholder="请选择"
                            >   
                                <Option value="1">选项一</Option>
                                <Option value="2">选项二</Option>
                                <Option value="3">选项三</Option>
                            </Select>
                        </FormItem>
                        <Button type="primary" size="large" icon="search" loading={loading} onClick={this.submit}>查询</Button>
                    </Form>
                    <div id="editor"></div>
                    <Table className="table-box" columns={columns}
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