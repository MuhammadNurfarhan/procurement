<script lang="ts" setup>

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
  documents: {
    nib: null, // Dokumen NIB
    npwp: null, // Dokumen NPWP
    suratPkp: null, // Surat PKP/Non PKP
    rekeningKoran: null, // Scan rekening koran
    suratPernyataan: null, // Surat pernyataan
  },
});

const tradeTermOption: any = [
  "Provide services and ensure",
  "The buyer's company receives the goods",
  "The buyer's company receives the goods and ensures that the acceptance is completed and ready for use",
  "Trade term + port name or country or designated place",
]

const rules = {
  required: (value: string) => !!value || 'This field is required',
  email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
  number: (value: string) => /^\d+$/.test(value) || 'Must be a valid number',
  file: (value: File | null) => !!value || 'File is required',
};

const formRef = ref(null);

const submitForm = () => {
  if (formRef.value?.validate()) {
    console.log('Form data:', form.value);
    alert('Form submitted successfully!');
  } else {
    alert('Please fix all errors before submitting.');
  }
};

const handleFileUpload = (e: Event, docKey: string) => {
  const files = (e.target as HTMLInputElement).files;
  if (files && files[0]) {
    form.value.documents[docKey] = files[0];
  }
};
</script>

<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title class="text-h5 bg-primary mb-5 rounded-xl">Supplier Registration Form</v-card-title>
      <v-card-text>
        <v-form ref="formRef">
          <v-row dense>
            <!-- Column 1 -->
            <v-col cols="12" md="6">
              <v-text-field label="Company Name" v-model="form.companyName" :rules="[rules.required]" placeholder="Nama Perusahaan" required />
              <v-textarea label="Company Address" v-model="form.companyAddress" rows="3" :rules="[rules.required]" placeholder="Alamat Perusahaan" required />
              <v-text-field label="Factory Address" v-model="form.factoryAddress" placeholder="Alamat Perusahaan" />
              <v-text-field label="Key Material" v-model="form.keyMaterial" :rules="[rules.required]" required placeholder="Bidang perusahaan penyedia jasa/barang/dll" />
              <v-text-field label="Business Registration No." v-model="form.businessRegNo" :rules="[rules.required]" placeholder="Nomor sesuai NIB" required />
              <v-text-field label="Contact Person" v-model="form.contactPerson" :rules="[rules.required]" placeholder="Nama PIC" required />
              <v-text-field label="Tel #" v-model="form.tel" :rules="[rules.required]" placeholder="Nomor Telepon" required />
              <v-text-field label="Name of Bank" v-model="form.bankName" placeholder="Nama Bank"  />
            </v-col>

            <!-- Column 2 -->
            <v-col cols="12" md="6">
              <v-text-field label="Beneficiary Name" v-model="form.beneficiaryName" placeholder="Nama rekening bank"  />
              <v-text-field label="Account No." v-model="form.accountNo" :rules="[rules.number]" placeholder="Nomor rekening bank" />
              <v-date-input
                label="Founded Date"
                v-model="form.foundedDate"
                prepend-icon=""
                prepend-inner-icon="mdi-calendar"
                placeholder="Tanggal pendirian perusahaan"
                required
              />
              <v-text-field label="P.I.C" v-model="form.pic" placeholder="Nama PIC" />
              <v-text-field label="E-mail" v-model="form.email" :rules="[rules.required, rules.email]" placeholder="Email PIC/Perusahaan" required />
              <v-text-field label="Fax" v-model="form.fax" placeholder="Jika kosong tulis (-)" />
              <v-text-field label="SWIFT CODE" v-model="form.swiftCode" placeholder="Swift code bank" />
              <v-text-field label="Currency" v-model="form.currency" placeholder="Mata uang" />
            </v-col>
          </v-row>

          <v-row dense>
            <!-- Payment Term -->
            <v-col cols="12" md="6">
              <v-text-field label="Payment Term" v-model="form.paymentTerm" placeholder="Payment term" />
            </v-col>

            <!-- Trade Term -->
            <v-col cols="12" md="6">
              <v-select
                label="Trade Term"
                v-model="form.tradeTerm"
                :items="tradeTermOption"
                :rules="[rules.required]"
                required
              />
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
                :rules="[rules.number]"
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

          <!-- Kelengkapan Dokumen -->
          <v-row dense>
            <v-col cols="12" class="mt-5">
              <h5>Kelengkapan Dokumen</h5>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                label="NIB"
                accept=".pdf,.doc,.docx,.jpg,.png"
                @change="handleFileUpload($event, 'nib')"
                :rules="[rules.file]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                label="NPWP"
                accept=".pdf,.doc,.docx,.jpg,.png"
                @change="handleFileUpload($event, 'npwp')"
                :rules="[rules.file]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                label="Surat PKP/Non PKP"
                accept=".pdf,.doc,.docx,.jpg,.png"
                @change="handleFileUpload($event, 'suratPkp')"
                :rules="[rules.file]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                label="Scan Rekening Koran Bank"
                accept=".pdf,.doc,.docx,.jpg,.png"
                @change="handleFileUpload($event, 'rekeningKoran')"
                :rules="[rules.file]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                label="Surat Pernyataan"
                accept=".pdf,.doc,.docx,.jpg,.png"
                @change="handleFileUpload($event, 'suratPernyataan')"
                :rules="[rules.file]"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn
          class="submit-btn bg-primary"
          dark
          large
          elevation="3"
          rounded
          @click="submitForm"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  max-width: 900px;
  margin: auto;
}

.submit-btn {
  width: 15%;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: var(--v-primary-lighten1);
  transform: scale(1.05);
}
</style>
