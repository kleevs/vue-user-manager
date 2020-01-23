<template>
    <div> 
  <h1 class="title">Liste des utilisateurs</h1> 
  <hr/>
  <div class="container">
      <table class="user-table table table-striped table-hover"> 
          <thead> 
              <tr> 
                  <td>Nom</td> 
                  <td>Prénom</td> 
                  <td>Date de naissance</td> 
                  <td>Login</td> 
                  <td>Mot de passe</td> 
                  <td>Actif</td> 
              </tr> 
          </thead> 
          <tbody> 
              <tr v-for="user in users" :key="user.id" class="clickable">
                  <td data-id="last-name">{{user.lastName}}</td> 
                  <td data-id="first-name">{{user.firstName}}</td> 
                  <td data-id="birthdate">{{user.birthDate}}</td> 
                  <td data-id="login">{{user.login}}</td> 
                  <td data-id="password">{{user.password}}</td> 
                  <td data-id="actif">{{user.isActif && "actif" || "inactif"}}</td> 
                  <td class="action" data-id="action">
                      <a data-action="update" :href="`/users/${user.id}`" class="fa fa-edit clickable zoom-hover attention-hover" data-content="Cliquer pour acceder à l'écran de modification d'un utilisateur"></a>
                      <a data-action="remove" :class="user.isCurrent && 'hide' || '' + 'fa fa-trash clickable zoom-hover attention-hover'" @click="removeUser(user.id)" data-content="Cliquer pour supprimer un utilisateur"></a>
                  </td>
              </tr> 
          </tbody> 
      </table> 
      <a href="/users" class="btn btn-primary full-width attention-hover" data-content="Cliquer pour acceder à l'écran d'ajout d'un nouvel utilisateur"><span class="fa fa-plus">&nbsp;</span>Nouvel utilisateur</a>
  </div>
</div>
</template>
 
<script lang="ts">
    import Vue from "vue";
    import { ListPage } from "../../domain/page/list";
    import AjaxService from "../../domain/api/ajax.service";
 
    export default Vue.extend({
        props: {
            'page': ListPage
        },
        data() {
            return this.page
        },
        methods: {
            removeUser(userId: number) {
                this.$data.removeUser(userId);
            }
        }
    });
</script>