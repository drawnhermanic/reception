<template>
  <section class="splash">
    <div>
      <h1 class="title">
        Visitor Check In
      </h1>
      <h2 class="subtitle"></h2>

      <div class="mt-5">
        <div v-if="userSession">
          <p class="pt-3">Hi {{ userSession.displayName }}!</p>

          <ValidationObserver ref="observer">
            <div class="form-group pb-5">
              <div class="form-group row has-error">
                <div class="col">
                  <ValidationProvider
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Who are you visiting today?"
                      v-model="name"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <div class="form-group row">
                <div class="col">
                  <ValidationProvider
                    rules="required|alpha_num"
                    v-slot="{ errors }"
                  >
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Car Registration"
                      v-model="carRegistration"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <div class="form-group row">
                <div class="col">
                  <ValidationProvider
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Contact Number"
                      v-model="contactNumber"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-group row">
                  <div class="col">
                    <label
                      >Employee
                      <input
                        type="radio"
                        name="radio_vistorType"
                        value="Employee"
                        v-model="visitorType"
                      />
                    </label>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col">
                    <label
                      >Contractor
                      <input
                        type="radio"
                        name="radio_vistorType"
                        value="Contractor"
                        v-model="visitorType"
                      />
                    </label>
                  </div>
                </div>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>

              <div>Check In Time: {{ displayCurrentDateTime }}</div>

              <link-button @click="saveVisit" sm primary>Submit</link-button>
            </div>
          </ValidationObserver>
          <link-button @click="$store.dispatch('signout')" sm primary
            >Sign Out</link-button
          >
        </div>
        <div v-else>
          <p class="pt-3">Please sign in or register to record your visit.</p>
          <link-button href="/signin" sm primary>Sign In</link-button>
          <link-button href="/signup" sm outline-secondary class="ml-2"
            >Register</link-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Routes } from '../shared'
import { CreateVisit, VisitorType } from '../shared/dtos'
import moment from 'moment'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },

  data: () => ({
    value: '',
    name: '',
    visitorType: null,
    carRegistration: null,
    contactNumber: null,
    visitTime: ''
  }),

  computed: {
    ...mapGetters(['userSession', 'user']),
    displayCurrentDateTime: function () {
      return moment(this.visitTime).format('DD MMM YYYY hh:mm:ss')
    }
  },

  created() {
    this.init()
  },

  mounted() {},

  methods: {
    ...mapActions(['createVisit', 'getUser']),
    async init() {
      await this.getUser()
      this.setUserDetails()
      this.setDateTime()
    },
    setDateTime: function () {
      setInterval(() => {
        this.visitTime = moment().toDate()
      }, 500)
    },
    setUserDetails: function () {
      if (this.user) {
        if (this.user.phoneNumber) {
          this.contactNumber = this.user.phoneNumber
        }
        if (this.user.carRegistration) {
          this.carRegistration = this.user.carRegistration
        }
      }
    },
    saveVisit: async function () {
      let isValid = await this.$refs.observer.validate()
      if (isValid) {
        try {
          this.loading = true
          this.responseStatus = null

          let request = new CreateVisit({
            hostName: this.name,
            visitorType: this.visitorType,
            dateTime: moment(this.visitTime),
            carRegistration: this.carRegistration,
            contactNumber: this.contactNumber
          })
          await this.createVisit(request)

          this.$router.push(this.$route.query.redirect || Routes.Visit)
        } catch (e) {
          this.responseStatus = e.responseStatus || e
        } finally {
          this.loading = false
        }
        return
      }
    }
  }
}
</script>

<style>
.splash {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.field-validation-error {
  color: #d30f8b;
}
</style>
