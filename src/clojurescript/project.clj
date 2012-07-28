(defproject clojurescript "1.0.0-SNAPSHOT"
  :description "FIXME: write description"
  :dependencies [[org.clojure/clojure "1.4.0"]]
  :plugins [[lein-cljsbuild "0.2.4"]]
  :cljsbuild {
    :builds [{
      :source-path "src"
      :compiler {
        :output-to "cardboard.js"
        :optimizations :whitespace
        :pretty-print true}}]})
