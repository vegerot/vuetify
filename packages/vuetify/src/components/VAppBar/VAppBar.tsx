// Styles
import './VAppBar.sass'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'

// Utilities
import { computed, defineComponent, toRef } from 'vue'
import { makeTagProps } from '@/composables/tag'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VAppBar',

  props: makeProps({
    ...makeLayoutItemProps({ name: 'app-bar' }),
    ...makeSheetProps(),
    ...makeTagProps({ tag: 'header' }),
    mobile: Boolean,
    modelValue: Boolean,
    src: String,
    temporary: Boolean,
    height: {
      type: [Number, String],
      default: 64,
    },
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-app-bar')
    // const isActive = useProxiedModel(props, 'modelValue')
    const styles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      computed(() => 'top'),
      computed(() => props.height),
    )

    return () => {
      const hasImg = (slots.img || props.src)

      return (
        <props.tag
          class={[
            'v-app-bar',
            sheetClasses.value,
          ]}
          style={[
            sheetStyles.value,
            styles.value,
          ]}
        >
          { hasImg && (
            <div class="v-app-bar__img">
              { slots.img
                ? slots.img?.({ src: props.src })
                : (<img src={ props.src } alt="" />)
              }
            </div>
          )}

          { slots.prepend && (
            <div class="v-app-bar__prepend">
              { slots.prepend?.() }
            </div>
          )}

          <div class="v-app-bar__content">
            { slots.default?.() }
          </div>

          { slots.append && (
            <div class="v-app-bar__append">
              { slots.append?.() }
            </div>
          )}
        </props.tag>
      )
    }
  },
})
