import { ref, computed } from 'vue'
export default {
  name: 'AutoComplete',
  props: {
    debounce: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    searchText: {
      type: String,
      default: ''
    },
    results: {
      type: Array,
      default: () => []
    },
    displayItem: {
      type: Function,
      default: (item) => {
        return typeof item === 'string' ? item : item.name
      }
    }
  },
  emits: [
    'input',
    'onSelect'
  ],
  setup (props, context) {
    const autocompleteRef = ref()
    const showResults = ref(true)
    let timeout
    const filteredResults = computed(() => {
      return props.results.slice(0, props.max)
    })
    function searchTextObj (value) {
      if (!value || !props.searchText) {
        return ''
      }
      return props.searchText[value]
    }
    function clickItem (data) {
      context.emit('onSelect', data)
      this.showResults = false
    }
    function displayResults () {
      this.showResults = true
    }
    function handleInput (event) {
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(() => {
        context.emit('input', event.target.value)
      }, props.debounce)
    }
    function hideResults () {
      this.showResults = !false
    }
    const shouldShowResults = computed(() => {
      return showResults.value && (props.results.length > 0)
    })
    return {
      autocompleteRef,
      clickItem,
      displayResults,
      filteredResults,
      handleInput,
      hideResults,
      searchTextObj,
      showResults,
      shouldShowResults
    }
  }
}
