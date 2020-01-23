import Vue from "vue";
import ListComponent from "./components/list.vue";
import DetailComponent from "./components/detail.vue";
import { ListPage } from "../domain/page/list";
import { AjaxService } from "../domain/api/mock/ajax.service";
import { DetailPage } from "../domain/page/detail";
import './directive/vibrate';

const routes = [
    { path: '/users/:id', component: DetailComponent, page : (props) => new DetailPage(new AjaxService(), +props.match.params.id)},
    { path: '/users', component: DetailComponent, page : () => new DetailPage(new AjaxService(), null)},
    { path: '/', component: ListComponent, page: () => new ListPage(new AjaxService())}
]

let v = new Vue({
    el: "#app",
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent () {
            var page = routes.map(_ => ({ regexp: new RegExp(
                    `^${_.path.replace(/:(\w+)/gi, '(?<$1>[^/]+)')}`
                ).exec(this.currentRoute), component: _.component, page: _.page }))
                .filter(_ => !!_.regexp)
                .filter((_, i) => i === 0)
                .map(_ => ({ component: _.component, page: _.page({ match: { params: (<any>_.regexp).groups } }) }))[0];

            return page
        }
    },
    render (h) {
        return h(this.ViewComponent.component, {
            props: {
                page: this.ViewComponent.page
            }
        }) 
    }
});