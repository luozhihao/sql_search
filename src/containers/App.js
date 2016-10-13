import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Select, Button, Card, Table, message, notification } from 'antd'

import 'fetch-polyfill'
import 'whatwg-fetch'
require('es6-promise').polyfill()

let editor

const FormItem = Form.Item
const Option = Select.Option

const initHeader = [{
    title: '表名一',
    dataIndex: 'name',
}, {
    title: '表名二',
    dataIndex: 'gender',
}, {
    title: '表名三',
    dataIndex: 'email',
}]

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            loading: false,
            stations: [],
            columns: initHeader,
            data: [],
            pagination: {
                pageSize: 2
            }
        }
    }

    componentDidMount() {
        let Mode = ace.require("ace/mode/sql").Mode

        editor = ace.edit("editor")
        editor.setTheme("ace/theme/sqlserver")
        editor.setFontSize(16)
        editor.setPrintMarginColumn(-10)
        editor.session.setMode(new Mode())

        this.getStack()
    }

    // 查询事件
    submit = () => {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return
            }

            if (!editor.getValue()) {
                message.info('请输入查询语句')

                return false
            }

            this.setState({loading: true})

            this.getTable()
        })
    }

    // 清空事件
    clear = () => {
        editor.setValue('', -1)
    }

    // 获取分站
    getStack = () => {
        fetch('/ajax_get_stations/', {
            credentials: 'include'
        })
        .then((res) => { return res.json() })
        .then((data) => {
            this.setState({
                stations: data
            })
        })
    }

    // 数据获取
    getTable = (params = {}) => {
        fetch('/execute_sql/', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                station_id: this.props.form.getFieldValue('station'),
                sql: editor.getValue(),
                ...params
            })
        })
        .then((res) => { return res.json() })
        .then((data) => {
            if (data.result && data.res.length) {
                let arr = Object.keys(data.res[0]),
                    header = []

                arr.map((e, i) => {
                    header.push({title: e, dataIndex: e})
                })

                const pagination = this.state.pagination

                pagination.total = data.total

                console.log(pagination)

                this.setState({
                    columns: header,
                    data: data.res,
                    loading: false,
                    pagination
                })
            } else {
                this.openNotification(data.msg)

                this.setState({
                    columns: initHeader,
                    data: [],
                    loading: false
                })
            }
        })
    }

    // 分页操作
    handleTableChange = (pagination) => {
        const pager = this.state.pagination

        pager.current = pagination.current

        console.log(pagination)

        this.setState({
            pagination: pager
        })

        this.getTable({
            results: 10,
            page: pagination.current
        })
    }

    // 信息提示
    openNotification = (msg) => {
        const args = {
            message: '出错了',
            description: msg,
            duration: 0
        }

        notification.error(args)
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
        const { stations, loading, columns, data, pagination } = this.state

        const { getFieldProps } = this.props.form

        const stationProps = getFieldProps('station', {
            rules: [
                { required: true, type: 'number', message: '请选择分站' }
            ]
        })

        return(
            <div className="main">
                <Card
                    title="计费数据库查询工具" 
                    extra={<a href="#" onClick={this.logout}>退出</a>} 
                    style={{ width: '70%', margin: '0 auto' }}
                >
                    <Form inline className="search-box" form={this.props.form}>
                        <FormItem
                           label="分站"
                           hasFeedback
                        >
                            <Select
                                style={{ width: 200 }}
                                placeholder="请选择"
                                {...stationProps}
                            >   
                                {
                                    stations.map((e, i) =>
                                        <Option value={e.value} key={i}>{e.label}</Option>
                                    )
                                }
                            </Select>
                        </FormItem>
                    </Form>
                    <div id="editor">
{`select a.tablespace_name tablespace,
(b.current_size-a.free_size)*100/b.max_size as used_pct,
b.max_size - b.current_size + a.free_size as free_size
from
(select tablespace_name,sum(bytes/1024/1024) free_size from dba_free_space group by tablespace_name) a,
(select tablespace_name,sum(decode(autoextensible,'NO',BYTES, MAXBYTES)/1024/1024) max_size,sum(bytes/1024/1024) current_size 
from dba_data_files where status = 'AVAILABLE' and ONLINE_STATUS IN('ONLINE','SYSTEM') group by tablespace_name) b
where a.tablespace_name=b.tablespace_name`}
                    </div>
                    <div className="text-center mt20">
                        <Button type="primary" size="large" icon="search" loading={loading} onClick={this.submit}>查询</Button>
                        &nbsp;&nbsp;
                        <Button type="default" size="large" icon="reload" onClick={this.clear}>清空</Button>
                    </div>
                    <Table 
                        className="mt20" 
                        columns={columns}
                        dataSource={data}
                        pagination={pagination}
                        loading={loading}
                        size="small"
                        onChange={this.handleTableChange}
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