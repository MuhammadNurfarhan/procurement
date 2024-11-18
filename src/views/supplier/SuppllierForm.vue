<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
  companyName: '',
  companyAddress: '',
  factoryAddress: '',
  keyMaterial: '',
  businessRegNo: '',
  contactPerson: '',
  tel: '',
  bankName: '',
  beneficiaryName: '',
  accountNo: '',
  foundedDate: null,
  pic: '',
  email: '',
  fax: '',
  swiftCode: '',
  currency: '',
  bankCharge: '',
  tradeTerm: '',
  paymentTerm: '',
  discount: '',
  discountRate: null,
  taxRate: '',
});

const submitForm = () => {
  console.log('Form data:', form.value);
};
</script>

<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title class="text-h5 bg-primary mb-5 rounded-xl">Supplier Registration Form</v-card-title>
      <v-card-text>
        <v-form>
          <v-row dense>
            <!-- Column 1 -->
            <v-col cols="12" md="6">
              <v-text-field label="Company Name" v-model="form.companyName"  required />
              <v-text-field label="Company Address" v-model="form.companyAddress"  required />
              <v-text-field label="Factory Address" v-model="form.factoryAddress"  />
              <v-text-field label="Key Material" v-model="form.keyMaterial"  required />
              <v-text-field label="Business Registration No." v-model="form.businessRegNo"  required />
              <v-text-field label="Contact Person" v-model="form.contactPerson"  required />
              <v-text-field label="Tel #" v-model="form.tel"  required />
              <v-text-field label="Name of Bank" v-model="form.bankName"  />
            </v-col>

            <!-- Column 2 -->
            <v-col cols="12" md="6">
              <v-text-field label="Beneficiary Name" v-model="form.beneficiaryName"  />
              <v-text-field label="Account No." v-model="form.accountNo"  />
              <v-date-input
                label="Founded Date"
                v-model="form.foundedDate"
                prepend-icon=""
                prepend-inner-icon="mdi-calendar"
                required
              />
              <v-text-field label="P.I.C" v-model="form.pic"  />
              <v-text-field label="E-mail" v-model="form.email"  required type="email" />
              <v-text-field label="Fax" v-model="form.fax"  />
              <v-text-field label="SWIFT CODE" v-model="form.swiftCode"  />
              <v-text-field label="Currency" v-model="form.currency"  />
            </v-col>
          </v-row>

          <v-row dense>
            <!-- Deduct Bank Charge -->
            <v-col cols="12" md="6">
              <v-radio-group v-model="form.bankCharge" row>
                <label>Deduct Bank Charge from Payment:</label>
                <v-radio label="Yes" value="yes" />
                <v-radio label="No" value="no" />
              </v-radio-group>
            </v-col>

            <!-- Trade Term -->
            <v-col cols="12" md="6">
              <v-select
                label="Trade Term"
                v-model="form.tradeTerm"
                :items="[
                  'Provide services and ensure',
                  'The buyer\'s company receive the goods',
                  'The buyer\'s company receive the goods and ensures that the acceptance is completed and ready for use',
                  'Trade term + port name or country or designated place',
                ]"

                required
              />
            </v-col>
          </v-row>

          <v-row dense>
            <!-- Payment Term -->
            <v-col cols="12" md="6">
              <v-text-field label="Payment Term" v-model="form.paymentTerm"  />
            </v-col>

            <!-- Discount -->
            <v-col cols="12" md="6">
              <v-radio-group v-model="form.discount" row>
                <label>Discount:</label>
                <v-radio label="No" value="no" />
                <v-radio label="Yes" value="yes" />
              </v-radio-group>
              <v-text-field
                label="Discount Rate (%)"
                v-model="form.discountRate"

                type="number"
                v-if="form.discount === 'yes'"
              />
            </v-col>
          </v-row>

          <v-row dense>
            <!-- Tax Rate -->
            <v-col cols="12" md="6">
              <v-radio-group v-model="form.taxRate" row>
                <label>Tax Rate:</label>
                <v-radio label="VAT Excluded" value="vat-excluded" />
                <v-radio label="VAT Included" value="vat-included" />
                <v-radio label="Zero-Tax-Rate" value="zero-tax-rate" />
              </v-radio-group>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn class="bg-primary rounded-xl" @click="submitForm">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  max-width: 900px;
  margin: auto;
}
</style>
