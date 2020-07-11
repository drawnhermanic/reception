<template>
  <div v-if="userSession" id="admin" class="text-center">
    <p class="my-2">
      {{ userSession.displayName }}
    </p>
    <p>
      {{ userSession.userName }}
    </p>
    <p v-if="userSession && userSession.roles" class="roles">
      <mark v-for="x in userSession.roles" :key="x">{{ x }}</mark>
    </p>

    <div v-if="visitors">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Visitor Name</th>
            <th>Host Name</th>
            <th>Visitor Type</th>
            <th>Visit Date</th>
            <th>Contact Number</th>
            <th>Car Registration</th>
            <th>Visit End Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(visitor, i) in visitors" :key="i">
            <td>{{ visitor.visitorName }}</td>
            <td>{{ visitor.hostName }}</td>
            <td>{{ visitor.visitorType }}</td>
            <td>{{ displayDate(visitor.dateTime) }}</td>
            <td>{{ visitor.contactNumber }}</td>
            <td>{{ visitor.carRegistration }}</td>
            <td>{{ displayDate(visitor.endDateTime) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { requiresRole } from '../../shared'
import moment from 'moment'

export default {
  computed: {
    ...mapGetters(['userSession', 'visitors'])
  },

  mounted() {
    this.requiresRole('Admin')
  },

  created() {
    this.init()
  },

  methods: {
    ...mapActions(['getVisitors']),
    async init() {
      await this.getVisitors()
    },
    displayDate: (date) => {
      if (date) {
        return moment(date).format('DD MMM YYYY hh:mm:ss')
      }
    },
    requiresRole
  }
}
</script>
