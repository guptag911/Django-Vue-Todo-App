axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: function () {
        return {
            allTasks: [],
            newTask: false,
            newTaskValue: "",
            editId: null,
            oldTask: {}
        }
    },
    methods:  {
        getTaskfromId: function (id) {
            for(var i=0; i<this.allTasks.length; i++){
                if (this.allTasks[i].id == id){
                    return this.allTasks[i];
                }
            }
        },
        getTasks: function () {
            axios
                .get('/api/v1/list')
                .then((resp) => {
                    this.allTasks = resp.data
                })
                .catch(error => console.log(error))
        },
        editMode: function (id) {
            this.editId = id;
            this.oldTask =  Object.assign({}, this.getTaskfromId(id));
        },
        deleteTask: function (id) {
            var taskList = [];
            axios
                .delete('/api/v1/delete/' + id)
                .then( () => {
                    for(var i=0; i<this.allTasks.length; i++){
                        if (this.allTasks[i].id !== id){
                            taskList.push(this.allTasks[i]);
                        }
                    }
                    this.allTasks = taskList;
                })
                .catch(error => {
                    console.log(error);
                    alert("Unable to delete task. Some error occured!", error);
                })
        },
        save: function  (id) {
            var newTask = this.getTaskfromId(id);
            axios
                .post('/api/v1/update/' + id, newTask)
                .then( () => {
                    this.editId = null;
                    this.oldTask = {};
                })
                .catch(error => {
                    console.log("Error", error);
                })
        },
        cancel: function (id) {
            this.editId = null;
            for(var i=0; i<this.allTasks.length; i++){
                if (this.allTasks[i].id == id){
                    this.allTasks[i] = this.oldTask;
                    this.oldTask = {};
                    return
                }
            }
        },
        toggleAddTask: function () {
            this.newTask = !this.newTask;
            this.newTaskValue = "";
        },
        submitNewTask: function () {
            var newTask = {
                'title': this.newTaskValue,
                'completed': false
            }
            axios
                .post('/api/v1/create', newTask)
                .then( resp => {
                    this.newTask = false;
                    this.allTasks.push(resp.data)
                })
                .catch (error => {
                    console.log("Error", error);
                })
        }
    },
    mounted: function () {
        this.getTasks();
    }
})