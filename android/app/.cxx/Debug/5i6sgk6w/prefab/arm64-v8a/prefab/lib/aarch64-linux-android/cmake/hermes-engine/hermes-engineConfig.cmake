if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/pooja/.gradle/caches/transforms-3/ba5e888a3197a3b53f2bd32f09b0df6e/transformed/jetified-hermes-android-0.74.0-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/pooja/.gradle/caches/transforms-3/ba5e888a3197a3b53f2bd32f09b0df6e/transformed/jetified-hermes-android-0.74.0-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

