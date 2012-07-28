(ns cardboard)

(def ^:private modules (atom {}))

(defn ^:export require [module-id]
  "Returns the module associated with the given module id."
  (@modules module-id))

(defn- ^:export convert-dep [d]
  (cond
    (= "require" d) require
    (= "exports" d) (.-exports js/window)
    :else (require d)))

(defn- ^:export define-with-func [id deps func]
  (let [dep-objs (into-array (map convert-dep deps))
        ret (apply func dep-objs)
        mod (if (nil? ret) (.-exports js/window) ret)]
    (swap! modules assoc id mod)))

(defn ^:export define
  "Defines a module.
    @param module-id
    @param dependencies optional array of module ids
    @param definition object or function that returns an object
      or uses the global export object to set properties."
  ([module-id definition] 
   (define module-id ["require" "exports"] definition))
  ([module-id dependencies definition]
   (set! (.-exports js/window) (js-obj))
   (cond
     (not (= (type definition) js/Function)) (swap! modules assoc module-id definition)
     :else (define-with-func module-id dependencies definition))))

(defn ^:export debug []
  (.log js/console "cardboard.js debug:")
  (.log js/console @modules))

(set! (.-exports js/window) (js-obj))
(set! (.-require js/window) require)
(set! (.-define js/window) define)
