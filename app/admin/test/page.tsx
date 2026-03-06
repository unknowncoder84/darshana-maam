export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">✅ Server is Working!</h1>
        <p className="text-gray-600 mb-4">
          If you can see this page, the server is running correctly.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-800 font-semibold">Next Steps:</p>
          <ol className="list-decimal list-inside text-green-700 text-sm mt-2 space-y-1">
            <li>Clear your browser cache (Ctrl+Shift+Delete)</li>
            <li>Go to: <code className="bg-green-100 px-1 rounded">http://localhost:3000/admin/login</code></li>
            <li>Login with: admin / admin123</li>
          </ol>
        </div>
        <a 
          href="/admin/login" 
          className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Login Page
        </a>
      </div>
    </div>
  );
}
