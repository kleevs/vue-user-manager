<template>
    <div>
  <h1 class="title">Détail de l'utilisateur</h1> 
  <hr/>
  <div class="container">
      <form class="full-width center"  @submit="$event.preventDefault(); saveUser()">
          <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Nom</span>
              </div>
              <input data-id="lastname" name="lastname" v-vibrate="lastNameError" :class="{ 'has-error' : lastNameError }" v-model="lastName" type="text" class="form-control" placeholder="Lastname" aria-label="Lastname" aria-describedby="basic-addon1">
          </div>

          <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Prénom</span>
              </div>
              <input data-id="firstname" name="firstname" v-vibrate="firstNameError" :class="{ 'has-error' : firstNameError }" v-model="firstName" type="text" class="form-control" placeholder="Firstname" aria-label="Firstname" aria-describedby="basic-addon1">
          </div>

          <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Date de naissance</span>
              </div>
              <input data-id="birthdate" name="birthdate" v-vibrate="birthdateError" :class="{ 'has-error' : birthdateError }" v-model="birthDateStr" type="text" class="form-control" placeholder="Birthdate" aria-label="Birthdate" aria-describedby="basic-addon1">
          </div>

          <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Login</span>
              </div>
              <input data-id="login" name="login" v-vibrate="loginError" :disabled="id" :class="{ 'has-error' : loginError }" v-model="login" type="text" class="form-control" placeholder="Login" aria-label="Login" aria-describedby="basic-addon1">
          </div>

          <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Mot de passe</span>
              </div>
              <input data-id="password" name="password" v-vibrate="passwordError" :disabled="!!id" :class="{ 'has-error' : passwordError }" v-model="password" type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
          </div>

          <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <div class="input-group-text">
                      <input data-id="actif" name="actif" v-model="isActif" type="checkbox" aria-label="Checkbox for following text input">
                  </div>
              </div>
              <span  class="form-control">{{ isActif && 'Actif' || 'Inactif'}}</span>
          </div>

          <button data-id="save" class="btn btn-primary full-width attention-hover" data-content="Enregistrer l'utilisateur">Enregistrer</button>
      </form>
  </div>
</div>
</template>
 
<script lang="ts">
    import Vue from "vue";
    import { DetailPage } from "../../domain/page/detail";
    import AjaxService from "../../domain/api/ajax.service";
    import ToolService from '../../domain/api/tool.service'
 
    var _strBirthDate = '';
    var toolService = new ToolService();
    export default Vue.extend({
        props: {
            'page': DetailPage
        },
        data() {
            return this.page
        },
        methods: {
            saveUser() {
                this.$data.saveUser();
            }
        },
        computed: {
            birthDateStr: {
                get: function () { 
                    var page: DetailPage = this;
                    return toolService.toDateString(page.birthdate) || _strBirthDate || ''; 
                },
                set: function (v: string) { 
                    var page: DetailPage = this;
                    page.birthdate = toolService.parseDate(_strBirthDate = v); 
                }
            }
        }
    });
</script>