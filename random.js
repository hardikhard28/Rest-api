<q-btn color="orange" rounded unelevated @click="openScheduleDialog"
            class="tw-w-40 tw-mr-1 md:tw-w-64 no-caps">
            <!-- class="tw-max-w-xl full-width tw-ml-1" no-caps> -->
            <template v-slot>
              <span>{{formatedScheduledAt}}</span>
              <q-icon size="xs" class="q-mx-sm"></q-icon>


              <span>Reschedule?</span>
            </template>
          </q-btn>
          <!-- <button @click="openScheduleDialog"  class=" tw-w-40 tw-mr-1 md:tw-w-64 tw-border tw-inline-flex tw-items-center tw-border-gray-300 tw-w-40 tw-mr-1 md:tw-w-64
            tw-font-medium tw-border tw-rounded-full tw-text-dark tw-bg-white hover:tw-bg-gray-100" >Reschedule</button> -->
          <button
            class="tw-rounded-full tw-mt-1 md:tw-w-64 tw-border tw-border-border-gray-300 tw-bg-transparent tw-mr-1 tw-pb-2 tw-pt-1 tw-px-4 tw-font-semibold tw-text-dark hover:tw-border-transparent hover:tw-bg-gray-200 tw-w-40"
            @click="openUnscheduleDialog(thread)">Unschedule
          </button>

          <q-icon size="xs" class="q-mx-sm" name="las la-arrow-right"></q-icon>