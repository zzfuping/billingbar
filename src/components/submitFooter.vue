
<template>
  <div class="sumbit-footer">
      <div class="footer-desc">
        <slot name="desc"></slot>
      </div>
      <div class="footer-btn">
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style>
.sumbit-footer {
    padding: 8px 16px;
}
.footer-desc {
    color: #999;
    font-size: 12px;
    padding: 8px;
}
.footer-btn {
    padding: 16px 0;
}
</style>