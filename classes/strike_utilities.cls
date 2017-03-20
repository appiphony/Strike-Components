public with sharing class strike_utilities {
    private static FINAL String MY_NAMESPACE = [SELECT NamespacePrefix FROM ApexClass WHERE Name = 'strike_utilities' LIMIT 1].NamespacePrefix;
    public static FINAL String NAMESPACE = String.isBlank(MY_NAMESPACE) ? '' : MY_NAMESPACE;
    public static FINAL String NAMESPACE_API = String.isBlank(MY_NAMESPACE) ? '' : MY_NAMESPACE + '__';

    public static String serializeWithoutNamespace(Object myObject) {
        return JSON.serialize(myObject).replaceAll(strike_utilities.NAMESPACE_API, '');
    }

    public static Map<String, Object> convertObjectToMap(Object myObject) {
        return (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(myObject));
    }
}